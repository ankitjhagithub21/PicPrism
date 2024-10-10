import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";

function Contact() {
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", `${import.meta.env.VITE_ACCESS_KEY}`);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    setIsLoading(true)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      })

      const data = await res.json()



      if (data.success) {
        toast.success("Message sent successfully.")
        event.target.reset()
      } else {
        toast.error("Error sending message")
      }
    } catch (error) {
      toast.error("Error in sending message")
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <section>
      <div className="w-full max-w-xl">
        <h2 className="text-3xl mb-5 ">Contact Us</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <input type="text" placeholder="Your name" name="name" className="input text-lg input-bordered" required autoComplete="off"/>
          <input type="email" name="email" placeholder="Your email" className="input text-lg input-bordered" required autoComplete="off" />
          <textarea name="message" rows={3} placeholder="Your message" className="textarea text-lg resize-none textarea-bordered" ></textarea>
          <button type="submit" className="btn btn-primary w-fit flex items-center text-lg " disabled={isLoading}>
            {
              isLoading ? 'Sending...' : 'Send message'
            }
            <IoIosSend />

          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;