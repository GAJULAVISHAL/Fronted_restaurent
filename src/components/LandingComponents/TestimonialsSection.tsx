import { TestimonialCard } from "./LandingData"

type Testimonial = {
    name: string
    copy: string
}

type TestimonialsSectionProps = {
    testimonials: Testimonial[]
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
    return (
        <section className="m-2 mt-4 p-2 relative flex items-center justify-center bg-white overflow-hidden" id="testimonials">
            <div className="mx-auto flex w-full max-w-[84rem] flex-col items-center gap-6 px-4">
                <div className="text-center">
                    <h2 className="mt-3 text-black font-bold text-center text-4xl">Benifited and satisfied</h2>
                    <p className="mt-3 text-neutral-600 max-w-2xl">
                        Real words from operators who switched to Delish and never looked back.
                    </p>
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-[70%]">

                        <div className="columns-1 gap-4 sm:columns-2 lg:columns-4">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.name} className="mb-4 break-inside-avoid">
                                    <TestimonialCard
                                        name={testimonial.name}
                                        copy={testimonial.copy}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
