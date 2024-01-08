"use client"
import React from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Icon from '@mdi/react';
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import Link from "next/link";
import { Image } from "@nextui-org/react";
import Logo from "@/app/assets/images/logos/logo-rounded.png";
import authServices from "../services/auth/auth-services";
import { useAuth } from '@/app/hooks/auth'
import { useRouter } from 'next/navigation'
import { useAuthStore } from "@/app/store/auth";

export default function LoginPage() {
	const { login } = useAuth('guest', '/dashboard')
	const isAuth = useAuthStore(state => state.isAuth)
	const router = useRouter()


	const [isVisible, setIsVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errors, setErrors] = React.useState([])
	const [status, setStatus] = React.useState(null)

	React.useEffect(() => {
		if (isAuth) {
			router.push('/dashboard')
		}
	}, [isAuth, router])


	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleLogin = async (formData: FormData) => {

		setIsLoading(true);
		const res = await login({ setErrors, setStatus, props: { email, password } });
		console.log("res", res);
	};


	return (
		<section className="bgr-image h-screen">
			<div className="hidden md:flex items-center justify-evenly h-full w-full ">
				<div className="h-[100%] flex items-center justify-center">
					<Image
						alt="Logo de la empresa"
						src={Logo.src}
					/>
				</div>

				<div className="bg-neuter-black h-[90%] w-[30%] rounded-[40px] mx-1 p-5">

					<div className="flex justify-center items-center mb-3">
						<div className="text-white text-center">
							<h1 className="text-2xl font-bold">Iniciar Sesión</h1>
							<span className="text-xs">Ingrese sus credenciales para acceder</span>
						</div>
					</div>


					<div className="grid grid-cols-1 gap-5">
						<form action={handleLogin}>
							<div className="text-white w-full">
								<div className="pb-1">

									<label className="text-white text-sm font-bold pb-3">Email</label>
								</div>
								<Input
									type="email"
									color="default"
									label="Email"
									variant="flat"
									className="w-full"
									name="email"
									onChange={event => setEmail(event.target.value)}
								/>
							</div>
							<div className="text-white w-full">
								<div className="pb-1">

									<label className="text-white text-sm font-bold">Password</label>
								</div>
								<Input
									label="Password"
									variant="bordered"
									placeholder="Enter your password"
									endContent={
										<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
											{isVisible ? (
												<Icon path={mdiEyeOutline} size={1} />
											) : (
												<Icon path={mdiEyeOffOutline} size={1} />)}
										</button>
									}
									type={isVisible ? "text" : "password"}
									className="w-full"
									name="password"
									onChange={event => setPassword(event.target.value)}
								/>
								<div className="flex justify-end pt-1">
									<span className="text-white text-end text-xs font-bold">¿Olvido su contraseña?</span>
								</div>
							</div>

							<div className="text-white h-[100%] flex items-end w-full">

								<Button
									isLoading={isLoading}
									color="primary"
									className="w-full"
									spinner={
										<svg
											className="animate-spin h-5 w-5 text-current"
											fill="none"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											/>
											<path
												className="opacity-75"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												fill="currentColor"
											/>
										</svg>
									}
									type="submit"
								>
									Iniciar Sesión
								</Button>

							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="hidden items-center justify-between h-full w-full">
				<div className="h-[100%] flex items-center justify-center">
					<Image
						alt="Logo de la empresa"
						src={Logo.src}
					/>
				</div>

				<div className="grid grid-cols-2 bg-neuter-black h-[90%] w-[30%] rounded-t-[40px] mx-1 p-5">
					<div className="text-white w-full col-span-2">
						<Input
							type="email"
							color="default"
							label="Email"
							variant="flat"
						/>
					</div>
					<div className="text-white w-full col-span-2">
						<Input
							label="Password"
							variant="bordered"
							placeholder="Enter your password"
							endContent={
								<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
									{isVisible ? (
										<Icon path={mdiEyeOutline} size={1} />
									) : (
										<Icon path={mdiEyeOffOutline} size={1} />)}
								</button>
							}
							type={isVisible ? "text" : "password"}
							className="w-full"
						/>
					</div>
				</div>
			</div>

		</section>
	);
}
