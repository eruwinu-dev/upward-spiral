import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

type Props = {}

const validationSchema = z
    .object({
        firstName: z.string().min(1, { message: "Required" }),
        lastName: z.string().min(1, { message: "Required" }),
        email: z
            .string()
            .min(1, { message: "Required" })
            .email({ message: "Must be a valid email" }),
        password: z
            .string()
            .min(6, { message: "Must be at least 6 characters" }),
        confirmPassword: z.string().min(1, { message: "Required" }),
        terms: z.literal(true, { errorMap: () => ({ message: "Must agree" }) }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    })

type ValidationSchema = z.infer<typeof validationSchema>

const TestForm = (props: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onSubmit: SubmitHandler<ValidationSchema> = async (data) =>
        console.log(data)

    return (
        <div className="mx-auto lg:w-5/12 md:w-5/12 w-11/12 px-8 py-4 rounded-2xl shadow-2xl">
            <form
                className="w-full grid grid-cols-2 grid-flow-row gap-y-4 gap-x-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-2">
                    <label className="font-semibold" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="w-full p-1 border-2 rounded-md"
                        placeholder="First Name"
                        {...register("firstName")}
                    />
                    {errors.firstName && (
                        <p className="text-sm text-red-500">
                            {errors.firstName?.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="font-semibold" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="w-full p-1 border-2 rounded-md"
                        placeholder="Last Name"
                        {...register("lastName")}
                    />
                    {errors.lastName && (
                        <p className="text-sm text-red-500">
                            {errors.lastName?.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2 col-span-2">
                    <label className="font-semibold" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-1 border-2 rounded-md"
                        placeholder="Email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email?.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="font-semibold" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-1 border-2 rounded-md"
                        placeholder=""
                        autoComplete="off"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">
                            {errors.password?.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="font-semibold" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full p-1 border-2 rounded-md"
                        placeholder=""
                        autoComplete="off"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                            {errors.confirmPassword?.message}
                        </p>
                    )}
                </div>
                <div className="col-span-2">
                    <div className="inline-flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            {...register("terms")}
                        />
                        <label className="font-semibold" htmlFor="terms">
                            I accept the Terms and Conditions.
                        </label>
                    </div>
                    {errors.terms && (
                        <p className="text-sm text-red-500">
                            {errors.terms?.message}
                        </p>
                    )}
                </div>
                <div className="col-span-2">
                    <button
                        type="submit"
                        className="w-full py-1.5 font-semibold text-white rounded-3xl bg-blue-500 hover:bg-blue-600"
                    >
                        Register Account
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TestForm
