import SoftBackdrop from "../components/SoftBackdrop";


const About = () => {
    return (
        <>
    <SoftBackdrop/>
    <div className="min-h-screen  text-gray-800">
      <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-25 ">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-white mb-4">
          About AutoThumb AI
        </h1>
        <p className="text-lg text-gray-200 max-w-3xl">
          AutoThumb AI is an intelligent thumbnail generation platform designed
          to help creators, marketers, and businesses create high-converting
          thumbnails in seconds using the power of artificial intelligence.
        </p>

        {/* Mission */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-gray-200 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-200 leading-relaxed max-w-4xl">
            Our mission is simple: to remove the complexity of thumbnail design.
            We believe great content deserves great visuals. AutoThumb AI
            empowers creators to focus on ideas and storytelling while our AI
            handles design, layout, and visual optimization.
          </p>
        </div>

        {/* What we do */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-white mb-6">
            What AutoThumb AI Does
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-200 border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                AI-Powered Thumbnails
              </h3>
              <p className="text-gray-900">
                Generate eye-catching thumbnails automatically using advanced AI
                models trained for visual impact and clarity.
              </p>
            </div>

            <div className="bg-gray-200 border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                Optimized for Clicks
              </h3>
              <p className="text-gray-900">
                Our system focuses on contrast, composition, and readability to
                help improve click-through rates across platforms.
              </p>
            </div>

            <div className="bg-gray-200 border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                Creator-Friendly Workflow
              </h3>
              <p className="text-gray-900">
                No design skills required. Just input your idea and let
                AutoThumb AI do the heavy lifting.
              </p>
            </div>

            <div className="bg-gray-200 border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                Fast & Scalable
              </h3>
              <p className="gray-200">
                Generate thumbnails in seconds whether you’re creating one video
                or managing content at scale.
              </p>
            </div>
          </div>
        </div>

        {/* Why choose */}
        <div className="mt-16 bg-gray-200 border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why Choose AutoThumb AI?
          </h2>
          <ul className="space-y-3 text-gray-900 list-disc list-inside">
            <li>Save time without sacrificing quality</li>
            <li>Designed for modern content creators</li>
            <li>Clean, simple, and intuitive interface</li>
            <li>Powered by smart AI design decisions</li>
          </ul>
        </div>

        {/* Closing */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-200 mb-3">
            Build Better Thumbnails, Faster
          </h3>
          <p className="text-gray-200 max-w-2xl mx-auto">
            AutoThumb AI is built to help you stand out in crowded feeds and
            competitive platforms. Create thumbnails that grab attention and
            convert viewers — effortlessly.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default About
