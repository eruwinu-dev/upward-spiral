import Spinner from "@/components/Spinner"
import useUserContext from "@/context/UserState"
import { useEditUser } from "@/hooks/user/useEditUser"
import { useGetUser } from "@/hooks/user/useGetUser"
import { AccountSchema } from "@/schemas/account"
import { timezones } from "@/utils/timezone"
import React, { MouseEvent, useEffect } from "react"
import { useForm } from "react-hook-form"

type Props = {}

const AccountForm = (props: Props) => {
    const {
        action: { editUser: editUserAction },
        toggleAction,
    } = useUserContext()

    const { data: user, isLoading } = useGetUser()

    const {
        register,
        watch,
        trigger,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "all",
    })

    const { mutateAsync: mutateEditUser } = useEditUser()

    const { name, timezone } = watch()

    useEffect(() => {
        if (!user) return
        setValue("name", user.name)
        setValue("timezone", user.timezone)
        return () => {}
    }, [])

    const submitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        toggleAction("editUser", "LOADING")
        if (!user) return
        const isValidated = await trigger(["name", "timezone"])
        if (!isValidated) return

        const data: AccountSchema = {
            name,
            timezone,
            email: user.email as string,
        }
        const count = await mutateEditUser(data)
        if (!count) return
        toggleAction("editUser", "SUCCESS")
    }

    if (isLoading)
        return (
            <div className="w-full grid grid-cols-1 grid-flow-row place-items-center place-content-center gap-4 col-span-12">
                <Spinner />
            </div>
        )

    return (
        <div className="lg:col-span-4 md:col-span-6 col-span-12 grid grid-cols-1 grid-flow-row gap-4 p-4 place-content-start">
            <div className="grid grid-cols-1 grid-flow-row gap-2">
                <h1 className="text-2xl font-bold">Account Settings</h1>
            </div>
            <form className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                        {errors.name && (
                            <span className="error-message">
                                {errors.name?.message as string}
                            </span>
                        )}
                    </label>
                    <input
                        type="text"
                        className={[
                            "input input-sm input-bordered",
                            errors.name ? "input-error" : "",
                        ].join(" ")}
                        placeholder="Name"
                        disabled={editUserAction === "LOADING"}
                        {...register("name", {
                            required: { value: true, message: "Required" },
                            minLength: { value: 1, message: "Required" },
                        })}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Time Zone</span>
                        {errors.timezone && (
                            <span className="error-message">
                                {errors.time?.message as string}
                            </span>
                        )}
                    </label>
                    <select
                        className={[
                            "select select-sm select-bordered w-full font-normal",
                            errors.duration ? "select-error" : "",
                        ].join(" ")}
                        disabled={editUserAction === "LOADING"}
                        defaultValue=""
                        {...register("timezone", {
                            required: { value: true, message: "Required" },
                            minLength: { value: 1, message: "Required" },
                        })}
                    >
                        <option disabled value="">
                            Select your timezone.
                        </option>
                        {timezones.map((zone) => (
                            <option
                                key={zone.name}
                                value={zone.name}
                                label={`${zone.name} (${zone.offset})`}
                                className="font-base"
                            />
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    className={[
                        "btn btn-sm btn-secondary",
                        editUserAction === "LOADING" ? "loading" : "",
                    ].join(" ")}
                    onClick={submitHandler}
                >
                    Edit User
                </button>
            </form>
        </div>
    )
}

export default AccountForm
