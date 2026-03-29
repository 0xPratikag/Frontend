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

const LandingFooter = () => {
  return (
    <div className=" bg-white text-slate-800">

      <section id="contact" className="py-20 px-6 bg-gradient-to-r from-blue-700 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-wider font-semibold text-white/80 mb-3">Get In Touch</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">Start Your Therapy Journey With Us</h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
              Reach out to book an assessment, ask about therapy plans, or learn which service is right for your child or family member.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white/10 backdrop-blur p-5 border border-white/20">
              <Phone className="h-6 w-6 mb-3" />
              <p className="text-sm text-white/80 mb-1">Call Us</p>
              <p className="font-semibold text-lg">+91 XXXXX XXXXX</p>
            </div>
            <div className="rounded-3xl bg-white/10 backdrop-blur p-5 border border-white/20">
              <MapPin className="h-6 w-6 mb-3" />
              <p className="text-sm text-white/80 mb-1">Visit Us</p>
              <p className="font-semibold text-lg">India Therapy Centre</p>
            </div>
            <div className="rounded-3xl bg-white/10 backdrop-blur p-5 border border-white/20">
              <Clock3 className="h-6 w-6 mb-3" />
              <p className="text-sm text-white/80 mb-1">Timings</p>
              <p className="font-semibold text-lg">Mon - Sat | 9 AM - 7 PM</p>
            </div>
            <div className="rounded-3xl bg-white/10 backdrop-blur p-5 border border-white/20">
              <Users className="h-6 w-6 mb-3" />
              <p className="text-sm text-white/80 mb-1">Consultation</p>
              <p className="font-semibold text-lg">Assessment & Therapy Plans</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingFooter;