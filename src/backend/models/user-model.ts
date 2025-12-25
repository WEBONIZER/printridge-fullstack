import { Schema, model } from "mongoose";
import { IUserSchema } from "../../utils/types";
import bcrypt from "bcrypt";

export const userSchema = new Schema<IUserSchema>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Пожалуйста, введите валидный email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Пароль должен содержать минимум 6 символов"],
      select: false, // По умолчанию не возвращать пароль в запросах
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    role: {
      type: String,
      required: false,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

// Хеширование пароля перед сохранением
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw error;
  }
});

// Метод для сравнения пароля
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUserSchema>("printridge-user", userSchema);

