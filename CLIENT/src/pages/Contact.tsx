import SoftBackdrop from "../components/SoftBackdrop"

const Contact = () => {
    return (
        <>
        <SoftBackdrop/>
            <div className="min-h-screen text-gray-200">
                <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-25">
                    {/* Heading */}
                    <h1 className="text-4xl font-bold text-gray-200 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-200 max-w-3xl">
                        Have a question, feedback, or need support? We’d love to hear from you.
                        Reach out to the AutoThumb AI team and we’ll get back to you as soon as
                        possible.
                    </p>

                    {/* Contact info */}
                    <div className="mt-14 grid sm:grid-cols-2 gap-8">
                        <div className="bg-gray-200 border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Email Us</h3>
                            <p className="text-gray-900">
                                For support, business inquiries, or feedback, email us at:
                            </p>
                            <p className="mt-2 font-medium text-blue-600">
                                support@autothumbai.com
                            </p>
                        </div>

                        <div className="bg-gray-200 border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Response Time</h3>
                            <p className="text-gray-900">
                                We typically respond within 24 hours on business days.
                                Our goal is to help you as quickly and clearly as possible.
                            </p>
                        </div>
                    </div>

                    {/* Contact form */}
                    <div className="mt-16 bg-gray-200 border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                            Send Us a Message
                        </h2>

                        <form className="grid gap-5 max-w-3xl">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full h-11 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full h-11 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell us how we can help you..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-fit px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition shadow-md"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Footer text */}
                    <div className="mt-16 text-center">
                        <p className="text-gray-600">
                            We value your feedback and are always working to improve
                            AutoThumb AI.
                        </p>
                    </div>
                </div>
            </div>
            </>
    )
}

export default Contact
