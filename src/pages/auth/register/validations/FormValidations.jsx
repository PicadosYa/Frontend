/* eslint-disable react-refresh/only-export-components */
import { z } from "zod";

const RegisterValidations = z
  .object({
    first_name: z
      .string()
      .min(1, "El nombre es obligatorio")
      .max(50, "El nombre no puede exceder los 50 caracteres"),
    last_name: z
      .string()
      .min(1, "El apellido es obligatorio")
      .max(50, "El apellido no puede exceder los 50 caracteres"),
    email: z
      .string()
      .email("El correo electrónico no es válido")
      .min(1, "El correo electrónico es obligatorio"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "La contraseña debe incluir al menos una letra mayúscula, una minúscula y un número"
      ),
    confirmPassword: z
      .string()
      .min(1, "La confirmación de contraseña es obligatoria"),
    phone: z
      .string()
      .regex(/^\d{8,15}$/, "El teléfono debe tener entre 8 y 15 dígitos"),
    role: z.enum(["client", "admin", "moderator"], {
      errorMap: () => ({ message: "El rol debe ser válido" }),
    }),
    accepted_terms: z
      .boolean()
      .refine((val) => val, "Debe aceptar los términos y condiciones"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], 
  });

const LoginValidations = z.object({
  email: z
    .string()
    .email("El correo electrónico no es válido")
    .min(1, "El correo electrónico es obligatorio"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "La contraseña debe incluir al menos una letra mayúscula, una minúscula y un número"
    ),
});

const SendRecuperationCodeValidations = z.object({
  email: z
    .string()
    .email("El correo electrónico no es válido")
    .min(1, "El correo electrónico es obligatorio"),
});

const ConfirmCodeValidations = z.object({
  token: z.string().min(1, "El token es obligatorio").length(6, "El token debe tener 6 caracteres"),
  new_password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "La contraseña debe incluir al menos una letra mayúscula, una minúscula y un número"
    ),
  confirm_password: z
      .string()
      .min(1, "La confirmación de contraseña es obligatoria"),
}).refine(data => data.new_password === data.confirm_password, {
  message: "Las contraseñas no coinciden",
  path: ["confirm_password"], 
});


const validateRegisterForm = (formData) => {
  try {
    RegisterValidations.parse(formData);
    console.log("Validación exitosa");
  } catch (e) {
    //console.error("Errores de validación:", e.errors);
    return e.errors; 
  }
};

const validateLoginForm = (formData) => {
  try {
    LoginValidations.parse(formData);
    console.log("Validación exitosa");
  } catch (e) {
    //console.error("Errores de validación:", e.errors);
    return e.errors; 
  }
};

const validateSendRecuperationCodeForm = (formData) => {
  try {
    SendRecuperationCodeValidations.parse(formData);
    console.log("Validación exitosa");
  } catch (e) {
    //console.error("Errores de validación:", e.errors);
    return e.errors; // Opcional, devuelve los errores si necesitas usarlos
  }
};

const validateConfirmCodeForm = (formData) => {
  try {
    ConfirmCodeValidations.parse(formData);
    console.log("Validación exitosa");
  } catch (e) {
    //console.error("Errores de validación:", e.errors);
    return e.errors; // Opcional, devuelve los errores si necesitas usarlos
  }
};

export { validateRegisterForm, validateLoginForm, validateSendRecuperationCodeForm, validateConfirmCodeForm };
