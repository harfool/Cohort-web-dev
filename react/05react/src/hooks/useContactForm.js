import { useState } from "react";

export function useContactForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const submitContact = async (formData) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSuccessMessage(data.success || "Message sent");
    } catch (error) {
      setErrorMessage(error.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    successMessage,
    errorMessage,
    submitContact,
  };
}
// using axios method

// import { useState } from "react";
// import axios from "axios";

// export function useContactForm() {
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const submitContact = async (formData) => {
//     setLoading(true);
//     setSuccessMessage(null);
//     setErrorMessage(null);

//     try {
//       const res = await axios.post("/api/contact", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       setSuccessMessage(res.data.success || "Message sent");
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const message = error.response?.data?.error || error.message || "Request failed";
//         setErrorMessage(message);
//       } else {
//         setErrorMessage("An unexpected error occurred");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     successMessage,
//     errorMessage,
//     submitContact,
//   };
// }
