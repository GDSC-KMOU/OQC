import React, { useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const { post } = location.state || {};

    useEffect(() => {
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        async function confirm() {
            const token = localStorage.getItem('token');
            await fetch("https://api.capserver.link/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestData),
            });
        }
        confirm();
        alert("결제에 성공하였습니다.")
        window.location.href = "/myposts";
    }, [navigate, searchParams, post]);

    return null;
}
