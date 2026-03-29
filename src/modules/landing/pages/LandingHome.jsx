import React from "react";
import {
  HeartHandshake,
  Brain,
  Speech,
  Activity,
  Users,
  Phone,
  MapPin,
  Clock3,
  CheckCircle2,
  Star,
  ArrowRight,
} from "lucide-react";
import logo from "../../../assets/logo.jpeg";


const services = [
  {
    icon: Brain,
    title: "Occupational Therapy",
    description:
      "Helping children and adults improve daily living, motor, sensory, and functional skills with personalized care plans.",
  },
  {
    icon: Speech,
    title: "Speech Therapy",
    description:
      "Support for speech, language, communication, fluency, and feeding challenges in a caring clinical environment.",
  },
  {
    icon: Activity,
    title: "Physiotherapy",
    description:
      "Evidence-based physical rehabilitation to improve strength, balance, mobility, posture, and pain management.",
  },
  {
    icon: HeartHandshake,
    title: "Behavioral & Counseling Support",
    description:
      "Compassionate guidance for emotional well-being, behavior management, confidence building, and family support.",
  },
];

const highlights = [
  "Experienced multidisciplinary therapists",
  "Personalized assessment and treatment plans",
  "Child-focused and family-friendly environment",
  "Support for developmental, speech, sensory, and physical needs",
];

const stats = [
  { value: "4+", label: "Core Therapy Services" },
  { value: "100%", label: "Personalized Care Approach" },
  { value: "1:1", label: "Dedicated Attention" },
  { value: "All Ages", label: "Support Available" },
];

const testimonials = [
  {
    name: "Parent Feedback",
    text: "The therapists are patient, supportive, and truly understand each child's unique needs. We saw real improvement in confidence and communication.",
  },
  {
    name: "Family Experience",
    text: "A warm and professional centre where therapy feels structured, caring, and effective. The team explains every step clearly.",
  },
  {
    name: "Client Review",
    text: "From assessment to regular sessions, the experience has been smooth and encouraging. The staff is kind and highly dedicated.",
  },
];

const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="max-w-3xl mx-auto text-center mb-12">
    <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
      {eyebrow}
    </p>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
    <p className="text-slate-600 text-base md:text-lg leading-relaxed">{subtitle}</p>
  </div>
);

const Card = ({ className = "", children }) => (
  <div className={`bg-white ${className}`}>{children}</div>
);

const CardContent = ({ className = "", children }) => (
  <div className={className}>{children}</div>
);

const Button = ({ className = "", variant = "default", children }) => {
  const base = "inline-flex items-center justify-center rounded-2xl h-12 px-6 text-base font-medium transition-colors";
  const styles =
    variant === "outline"
      ? "border border-orange-300 text-orange-700 hover:bg-orange-50 bg-white"
      : "bg-blue-700 text-white hover:bg-blue-800";

  return <button className={`${base} ${styles} ${className}`}>{children}</button>;
};

const LandingHome = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800">

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-16 h-72 w-72 bg-blue-100 rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-0 right-0 h-80 w-80 bg-orange-100 rounded-full blur-3xl opacity-70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-200 shadow-sm text-sm font-medium text-orange-700 mb-6">
              <Star className="h-4 w-4" />
              Trusted Therapy Support for Children & Families
            </div>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900 mb-6">
              Helping Every Individual
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-orange-500">
                Grow, Heal & Thrive
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
              India Therapy Centre provides multiple therapy services under one roof with a caring, personalized, and professional approach. We support developmental, communication, sensory, emotional, and physical growth through expert guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button className="rounded-2xl h-12 px-6 text-base bg-blue-700 hover:bg-blue-800">
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-2xl h-12 px-6 text-base border-orange-300 text-orange-700 hover:bg-orange-50">
                Explore Services
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/80 border border-slate-200 p-4 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <p className="text-sm text-slate-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-6 md:p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat) => (
                  <Card key={stat.label} className="rounded-2xl border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                      <div className="text-3xl font-bold text-blue-700 mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-orange-500 p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Users className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Holistic Therapy Care</h3>
                    <p className="text-white/90 text-sm">Assessment, planning, treatment, and progress tracking</p>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed text-sm md:text-base">
                  We focus on practical outcomes, parent involvement, and consistent progress with therapy programs tailored to individual needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="Our Services"
            title="Multiple Therapies, One Trusted Centre"
            subtitle="We provide a combination of therapeutic services designed to improve independence, confidence, movement, communication, and overall quality of life."
          />

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="rounded-3xl border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                  <CardContent className="p-7">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center mb-5">
                      <Icon className="h-7 w-7 text-blue-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why-us" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle
              eyebrow="Why Choose Us"
              title="A Compassionate Approach Backed by Expertise"
              subtitle="Our centre combines clinical care, family collaboration, and measurable progress so every therapy journey feels supportive and meaningful."
            />
          </div>

          <div className="grid gap-5">
            {[
              "Individual assessments and customized therapy plans",
              "Safe, child-friendly, and encouraging environment",
              "Regular progress updates and parent counseling",
              "Focused on communication, mobility, behavior, and life skills",
            ].map((point) => (
              <div key={point} className="flex items-start gap-4 rounded-3xl bg-white p-5 border border-slate-200 shadow-sm">
                <div className="h-11 w-11 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-orange-600" />
                </div>
                <p className="text-slate-700 text-base leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="Testimonials"
            title="Families Value Our Supportive Care"
            subtitle="A centre becomes meaningful when families feel heard, guided, and empowered throughout the therapy journey."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <Card key={item.name} className="rounded-3xl border-slate-200 shadow-sm">
                <CardContent className="p-7">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-5">“{item.text}”</p>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingHome;