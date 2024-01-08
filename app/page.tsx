"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useAuthStore } from "./store/auth";
import React from "react";
export default function Home() {

	const router = useRouter();
	const isAuth = useAuthStore((state) => state.isAuth);


	React.useEffect(() => {
		if (isAuth) {
			router.push("/dashboard");
		}
		router.push("/login");
	}, []);

	return (
		<section className="bg-black flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			Bienvenidos a mi app
			<Link
				href="/login"
			>
				<span className="text-white">Ir a login</span>
			</Link>
		</section>
	);
}
