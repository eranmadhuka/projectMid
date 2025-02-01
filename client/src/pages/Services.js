import React from 'react';
import Newslatter from '../components/Newslatter';
import PageBanner from '../components/ui/PageBanner';
import FeatureCard from '../components/ui/FeatureCard';
import CTAButton from '../components/ui/CTAButton';
import How from '../components/How'
import Heading from '../components/ui/Heading';

const Services = () => {
    return (
        <div>
            <PageBanner
                links={[
                    { text: 'Home', url: '/' },
                    { text: 'Services', url: '/services' }
                ]}
                title="Our Services"
            />

            {/* Features Section */}
            <section className="dark:bg-slate-800 bg-gray-100">
                <div className="relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                    <div className='text-center px-4'>
                        <Heading
                            preTitle="What We Offer"
                            title="What We Offer"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                        <FeatureCard
                            icon="📝"
                            title="Online Quizzes"
                            description="Take quizzes on various subjects to test your knowledge and improve your skills."
                        />
                        <FeatureCard
                            icon="📊"
                            title="Instant Results"
                            description="Get instant feedback on your quiz results to understand your strengths and weaknesses."
                        />
                        <FeatureCard
                            icon="🎓"
                            title="Performance Tracking"
                            description="Track your progress over time and see how you improve with each quiz."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <How />

            {/* Call to Action Section */}
            <section className="py-12 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Marks?</h2>
                    <p className="text-lg mb-8">Join ProjectMin today and start taking quizzes to enhance your knowledge and performance.</p>
                    <CTAButton
                        text="Get Started"
                        url="/register"
                        className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                    />
                </div>
            </section>

            <Newslatter />
        </div>
    );
};

export default Services;