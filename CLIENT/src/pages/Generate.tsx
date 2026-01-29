import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { colorSchemes, type AspectRatio, type IThumbnail, type ThumbnailStyle } from '../assets/assets';
import SoftBackdrop from '../components/SoftBackdrop';
import AspectRatioSelector from '../components/AspectRatioSelector';
import StyleSelector from '../components/StyleSelector';
import ColorSchemeSelector from '../components/ColorSchemeSelector';
import PreviewPanel from '../components/PreviewPanel';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../configs/api';


const Generate = () => {
    const {id} = useParams();
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();

    const [title, settitle] = useState('')
    const [additionalDetails, setadditionalDetails] = useState('')
    const [thumbnail, setthumbnail] = useState<IThumbnail | null>(null)
    const [loading, setloading] = useState(false)

    const [aspectRatio, setaspectRatio] = useState<AspectRatio>('16:9')
    const [colorSchemeId, setcolorSchemeId] = useState<string>(colorSchemes[0].id)
    const [style, setStyle] = useState<ThumbnailStyle>('Bold & Graphic')
    const [styleDropdownOpen, setstyleDropdownOpen] = useState(false)

    // Generate the image using AI
    const handleGenerate = async () => {
        try{
            if(!isLoggedIn){
                return toast.error("Please login to generate thumbnails");
            }
            if(!title.trim()) return toast.error("Title is required");
            setloading(true);
            const api_payload = {
                title,
                prompt: additionalDetails,
                style,
                aspect_ratio: aspectRatio,
                color_scheme: colorSchemeId,
                text_overlay: true,
            };
            const {data} = await api.post('/api/thumbnails/generate', api_payload);
            if(data.thumbnail){
                navigate('/generate/' + data.thumbnail._id);
                toast.success(data.message);
            }
        }catch (error) {
            toast.error("Failed to generate thumbnail. Please try again.");
        } finally {
            setloading(false);
        }
    };

    
    const fetchThumbnail = async () => {
        try {
            const {data} = await api.get(`/api/user/thumbnails/${id}`);
            setthumbnail(data?.thumbnail as IThumbnail);
            setloading(!data?.thumbnail?.image_url);
            setadditionalDetails(data?.thumbnail?.user_prompt);
            settitle(data?.thumbnail?.title);
            setcolorSchemeId(data?.thumbnail?.color_scheme);
            setaspectRatio(data?.thumbnail?.aspect_ratio);
            setStyle(data?.thumbnail?.style);
        } catch (error) {
            console.error("Fetch Thumbnail Error:", error);
            toast.error("Failed to fetch thumbnail. Please try again.");
        }
    }


    useEffect(() => {
      if(isLoggedIn && id){
        fetchThumbnail()
      }
      if(id && loading && isLoggedIn){
        const interval = setInterval(() => {
            fetchThumbnail();
        }, 5000);
        return () => clearInterval(interval);
      }
    }, [id, loading, isLoggedIn])
    
    useEffect(() => {
      if(!id && thumbnail){
        setthumbnail(null);
      }
    }, [pathname])
    
  return (
    <>
      <SoftBackdrop/>
      <div className='pt-24 min-h-screen'>
        <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8'>
            <div className='grid lg:grid-cols-[400px_1fr] gap-8'>
                {/* Left panel */}
                <div className={`space-y-6 ${id && 'pointer-events-none'}`}>
                    <div className='p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6'>
                    <div>
                        <h2 className='text-xl font-bold text-zinc-100 mb-1'>Create Your Thumbnail</h2>
                        <p className='text-sm text-zinc-400'>Describe your vision and let AI bring it to life</p>
                    </div>

                    <div className='space-y-5'>
                        {/* TITLE INPUT */}
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>Title or Topic</label>
                            <input type="text" value={title} onChange={(e)=> settitle(e.target.value)} maxLength={100} placeholder='e.g., 10 Tips for Better Sleep' className='w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                            <div className='flex justify-end'>
                                <span>{title.length} / 100</span>
                            </div>
                        </div>
                        {/* AspectRatioSelector */}
                        <AspectRatioSelector value={aspectRatio} onChange={setaspectRatio}/>

                        {/* StyleSelector */}
                        <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setstyleDropdownOpen}/>

                        {/* ColorSchemeSelector */}
                        <ColorSchemeSelector value={colorSchemeId} onChange={setcolorSchemeId}/>

                        {/* DETAILS */}
                        <div className='space-y-2'>
                            <label className='block text-sm font-medium'>
                                Additional Prompts <span className='text-zinc-400 text-xs'>(optional)</span>
                            </label>
                            <textarea value={additionalDetails} onChange={(e)=> setadditionalDetails(e.target.value)} rows={3} placeholder='Add any specific elements, mood or style preference...'className='w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'/>
                        </div>
                    </div>

                    {/* BUTTON: Displayed when id is not available. If id is available, means thumbnail is already generated*/}
                    {!id && (
                        <button onClick={handleGenerate} className='text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-blue-500 to-blue-600 hover:from-blue-700 disabled:cursor-not-allowed transition-colors'>
                            {loading? 'Generating...' : 'Generate Thumbnail'}
                        </button>
                    )}

                    </div>
                </div>


                {/* right panel */}
                <div>
                    <div className='p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl'>
                        <h2 className='text-lg font-semibold text-zinc-100 mb-4'>Preview</h2>
                        <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio}/>

                    </div>
                </div>
            </div>
        </main>
      </div>
    </>
  )
}

export default Generate
