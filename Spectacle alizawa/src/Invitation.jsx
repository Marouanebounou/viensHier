import { useState } from "react";
import api from "./api/axios"; 
import { motion } from "framer-motion";
import logo from './assets/1.png';
import { toast, ToastContainer } from "react-toastify";

import backgroundImage from './assets/viens.jpg';

const Invitation = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
  });
  const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ visible: false, message: "", isError: false });

const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Le nom et prénom sont requis";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'e-mail est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'e-mail n'est pas valide";
    }
    
    if (!formData.number.trim()) {
      newErrors.number = "Le numéro est requis";
    } else if (!/^\+?[\d\s-()]{8,}$/.test(formData.number.replace(/\s/g, ''))) {
      newErrors.number = "Le numéro n'est pas valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("api", formData); // Uncomment this in your actual project
      console.log(res.data);
      
      // Simulated API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPopup({
        visible: true,
        message:
          "Invitation envoyée ! 🎉 Vous recevrez bientôt votre réservation par e-mail. Veuillez vérifier votre boîte de réception et vos spams.",
        isError: false,
      });
      setErrors({});
      setFormData({ fullName: "", email: "", number: "" });
    } catch (error) {
      console.error(error.message);
      setPopup({
        visible: true,
        message: "Error sending invitation. Please try again later.",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const closePopup = () => setPopup({ visible: false, message: "", isError: false });
  
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "10px",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: window.innerWidth > 768 ? "fixed" : "scroll",
  };

  const logoStyle = {
    width: window.innerWidth <= 480 ? "200px" : "350px",
    height: "auto",
    marginBottom: window.innerWidth <= 480 ? "15px" : "20px",
    borderRadius: "8px",
  };

  const formStyle = {
    padding: window.innerWidth <= 480 ? "10px 20px" : "40px 30px",
    borderRadius: "16px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    marginBottom: window.innerWidth <= 480 ? "20px" : "30px",
    backdropFilter: "blur(5px)",
    margin: window.innerWidth <= 480 ? "0 10px 40px 10px" : "0 0 30px 0",
  };



  const subtitleStyle = {
    fontFamily: "Pacifico, cursive",
    fontSize: window.innerWidth <= 480 ? "22px" : "25px",
    textAlign: "center",
    marginBottom: window.innerWidth <= 480 ? "25px" : "30px",
    color: "#c9c4b6",
  };

  const inputStyle = {
    width: "100%",
    padding: window.innerWidth <= 480 ? "12px 14px" : "14px 16px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: window.innerWidth <= 480 ? "16px" : "14px", // 16px prevents zoom on iOS
    boxSizing: "border-box",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  };

  const buttonStyle = {
    width: "100%",
    padding: window.innerWidth <= 480 ? "12px" : "14px",
    backgroundColor: "#c9c4b6",
    color: "#fff",
    fontWeight: "bold",
    fontSize: window.innerWidth <= 480 ? "14px" : "15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };
    const spinnerStyle = {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #4a90e2",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  };

  return (
    <div style={pageStyle}>
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        style={logoStyle}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={formStyle}
      >
        <div>
          
          <p style={subtitleStyle}>Obtenez votre réservation gratuitement!</p>

          <input
            type="text"
            required
            name="fullName"
            placeholder="Nom et prénom"
            value={formData.fullName}
            onChange={handleChange}
            
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="tel"
            name="number"
            placeholder="Numéro"
            value={formData.number}
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={loading}
          />

          <motion.button
            type="submit"
            onClick={handleSubmit}
            style={buttonStyle}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            disabled={loading}
          >
            {loading ? (
              <div style={spinnerStyle} />
            ) : (
              "réserver"
            )}
          </motion.button>
          {/* Images */}
      
        </div>
      </motion.div>

      

      {/* Popup modal */}
      {popup.visible && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={closePopup} // click outside closes popup
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside popup
            style={{
              backgroundColor: "#fff",
              padding: "30px 25px",
              borderRadius: "12px",
              maxWidth: "350px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              color: popup.isError ? "#e74c3c" : "#c9c4b6",
              fontWeight: "bold",
            }}
          >
            <p>{popup.message}</p>
            <button
              onClick={closePopup}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: popup.isError ? "#e74c3c" : "#2ecc71",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Spinner animation keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
      <ToastContainer />
    </div>
  );
};

export default Invitation;