import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import AvatarCanvas from "../components/Avatar/avatarcanvas";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    } else if (!isAllowedEmail(formData.email)) {
      newErrors.email = "Sorry, email domain not allowed.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check allowed email domains
  const isAllowedEmail = (email) => {
    const allowedDomains = ["gmail.com", "yahoo.com","outlook.com"]; // add allowed domains
    const domain = email.split("@")[1];
    return allowedDomains.includes(domain);
  };

  const accessKey = import.meta.env.VITE_WEB3FORM_ACCESS_KEY;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setResult("Sending...");

    const form = new FormData(event.target);
    form.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully ✅");
        event.target.reset();
      } else {
        setResult(data.message || "Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center overflow-hidden px-4 sm:px-6"
      style={{ backgroundImage: `url("https://github.com/user-attachments/assets/80480ed4-ce01-4287-a148-8b44213df0f8")` }}
    >
      {/* Star Overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full animate-pulse bg-[url('/stars.svg')] bg-cover bg-center opacity-30" />
      </div>

      {/* Social Icons */}
      <div className="absolute top-6 right-6 flex flex-col gap-4 z-30">
        {[
          { Icon: FaLinkedin, href: "https://www.linkedin.com/in/ashmeet-singh-192610225/" },
          { Icon: FaEnvelope, href: "mailto:gaminggods0123@gmail.com" }
        ].map(({ Icon, href }, i) => (
          <motion.a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="text-white text-2xl sm:text-3xl drop-shadow-glow"
          >
            <Icon />
          </motion.a>
        ))}
      </div>

      {/* Form Card */}
      <div className="relative w-full flex items-center justify-center z-30 max-w-md round">
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none rounded-lg">
          <div className="w-full h-full bg-black">
            <div className="stars"></div>
            <div className="twinkling"></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 bg-transparent rounded-3xl p-6 sm:p-10 w-full max-w-md sm:max-w-xl shadow-[0_0_30px_#ffffff15] "
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-yellow-500 text-2xl sm:text-3xl font-bold mb-6 text-center dark:text-blue-600 dark:text-4xl dark:font-semibold"
          >
            📞 Contact Me !
          </motion.h2>

          <motion.form
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delayChildren: 0.2, staggerChildren: 0.2 },
              },
            }}
          >
            {["name", "email", "message"].map((field) => {
              const isTextArea = field === "message";
              const commonProps = {
                name: field,
                value: formData[field],
                onChange: handleChange,
                placeholder:
                  field === "name"
                    ? "Your Name"
                    : field === "email"
                    ? "Your Email"
                    : "Your Message",
                className: `p-3 rounded-md bg-white text-black placeholder-blue-800 border-yellow-200 border-2 w-full ${
                  errors[field] ? "border-red-400" : "border-white/10"
                } focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200 ${
                  field === "email" ? "shadow-[0_0_12px_#00ffff66]" : ""
                }`,
                required: true,
              };

              return (
                <motion.div
                  key={field}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  {isTextArea ? (
                    <textarea rows="4" {...commonProps} />
                  ) : (
                    <input type={field === "email" ? "email" : "text"} {...commonProps} />
                  )}
                  {errors[field] && (
                    <p className="text-red-400 text-sm px-1 -mt-2">{errors[field]}</p>
                  )}
                </motion.div>
              );
            })}

            {/* Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden group bg-gray-800 from-yellow-800 to-white-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:bg-white hover:text-black"
            >
              <span className="absolute inset-0 bg-white opacity-10 group-hover:animate-ripple" />
              Send Message
            </motion.button>
            {result && <p className="text-center text-sm text-white mt-2">{result}</p>}
          </motion.form>
        </motion.div>
      </div>

      {/* Avatar */}
      <div className="hidden sm:block absolute left-[-3%] bottom-[-3%] w-full sm:w-1/2 h-[70vh] z-10">
        <AvatarCanvas />
      </div>

      {/* Extra CSS */}
      <style>{`
        .stars, .twinkling {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          display: block;
          z-index: 1;
        }
        .stars {
          background: url('https://www.transparenttextures.com/patterns/stardust.png') repeat;
          animation: moveStars 200s linear infinite;
        }
        .twinkling {
          background: transparent url('https://www.transparenttextures.com/patterns/tiny-grid.png') repeat;
          animation: twinkle 4s linear infinite;
        }
        @keyframes moveStars {
          from { background-position: 0 0; }
          to { background-position: -10000px 5000px; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.2; }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 1s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
