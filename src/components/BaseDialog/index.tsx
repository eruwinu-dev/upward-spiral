import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment, ReactNode } from "react"

type Props = {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
    closeOnBlur?: boolean
    size?: string
}

const BaseDialog = ({
    isOpen,
    onClose,
    title,
    children,
    closeOnBlur = true,
    size = "max-w-md",
}: Props) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={closeOnBlur ? onClose : () => {}}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 pt-4 pb-2 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={[
                                    size,
                                    "w-full  transform overflow-hidden rounded-2xl bg-white px-6 pt-6 pb-2 text-left align-middle shadow-xl transition-all",
                                ].join(" ")}
                            >
                                <Dialog.Title
                                    as="div"
                                    className="w-full relative"
                                >
                                    <h3 className="text-2xl font-bold">
                                        {title}
                                    </h3>
                                    <button
                                        type="button"
                                        className="absolute -top-4 -right-2 btn btn-square btn-sm btn-ghost focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                        </svg>
                                    </button>
                                </Dialog.Title>
                                <div className="mt-2">{children}</div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default BaseDialog
