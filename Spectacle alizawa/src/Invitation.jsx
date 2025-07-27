import { useState } from "react";
import api from "./api/axios";
import { motion } from "framer-motion";

const Invitation = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
  });

   const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ visible: false, message: "", isError: false });


const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/", formData);
      console.log(res.data);
      setPopup({
        visible: true,
        message:
          "Invitation envoyée ! 🎉 Vous recevrez bientôt votre réservation par e-mail. Veuillez vérifier votre boîte de réception et vos spams.",
        isError: false,
      });
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
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  };

  const formStyle = {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "16px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
  };

  const titleStyle = {
    fontFamily: "Pacifico, cursive",
    fontSize: "30px",
    textAlign: "center",
    marginBottom: "10px",
    color: "#cac4b5",
  };

  const subtitleStyle = {
    fontSize: "15px",
    textAlign: "center",
    marginBottom: "30px",
    color: "#777",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#4a90e2",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={formStyle}
      >
        <form onSubmit={handleSubmit}>
          <h2 style={titleStyle}>Viens hier! 🪄</h2>
          <p style={subtitleStyle}>Obtenez votre réservation</p>

          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="tel"
            name="number"
            placeholder="Phone number"
            value={formData.number}
            onChange={handleChange}
            required
            style={inputStyle}
            disabled={loading}
          />

          <motion.button
            type="submit"
            style={buttonStyle}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            disabled={loading}
          >
            {loading ? (
              <div style={spinnerStyle} />
            ) : (
              "Subscribe"
            )}
          </motion.button>
        </form>
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
              color: popup.isError ? "#e74c3c" : "#2ecc71",
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
    </div>
  );
};

export default Invitation;