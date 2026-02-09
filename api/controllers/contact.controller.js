import Contact from "../models/contact.model.js";
import User from "../models/user.model.js";
import { sendContactEmail } from "../utils/emails.js";
import { errorHandler } from "../utils/error.js";
import { verifyRecaptcha } from "../utils/recaptcha.js";

export const createContact = async (req, res, next) => {
  const { recaptchaToken, ...contactData } = req.body
  const newContact = new Contact(contactData);
  try {
    // Verificar reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken)
    console.log('Llega aqui:', recaptchaToken)
    if (!recaptchaResult.success) {
      return next(errorHandler(400, "reCAPTCHA verification failed. Please try again."))
    }

    if (!newContact.name || !newContact.email || !newContact.content) {
      return next(errorHandler(400, "All fields are required"));
    }
    if (newContact.userId.trim() === "") {
      newContact.userId = undefined;
    }
    await newContact.save();
    res.status(201).json({ message: "Send message successfully" });
    await sendContactEmail(newContact.email, newContact.name, newContact.content);
    const users = await User.find({ isAdmin: true });
    users.forEach(async (user) => {
      await sendContactEmail(user.email, newContact.name, newContact.content);
    });
  } catch (error) {
    next(error);
  }
};
