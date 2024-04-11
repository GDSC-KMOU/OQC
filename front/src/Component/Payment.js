import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

const widgetClientKey = "test_ck_DLJOpm5QrlYzaoB5oGB58PNdxbWn";

export function CheckoutPage() {
    const location = useLocation();
    const post = location.state?.post;
    const customerKey = btoa(post.id);


    const [paymentWidget, setPaymentWidget] = useState(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price] = useState(post?.price);

    useEffect(() => {
        const fetchPaymentWidget = async () => {
            try {
                const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
                setPaymentWidget(loadedWidget);
            } catch (error) {
                console.error("Error fetching payment widget:", error);
            }
        };

        fetchPaymentWidget();
    }, [customerKey]);

    useEffect(() => {
        if (paymentWidget == null) {
            return;
        }

        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            "#payment-widget",
            { value: price },
            { variantKey: "DEFAULT" }
        );

        paymentWidget.renderAgreement(
            "#agreement",
            { variantKey: "AGREEMENT" }
        );

        paymentMethodsWidgetRef.current = paymentMethodsWidget;
    }, [paymentWidget, price]);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        paymentMethodsWidget.updateAmount(price);
    }, [price]);

    const handlePaymentRequest = async () => {
        const paymentDetails = {
            orderId: nanoid(), 
            orderName: post?.garbageName,
            customerName: post?.username,
            amount: post?.price,
            successUrl: `${window.location.origin}/success`,
            failUrl: `${window.location.origin}/fail`,
            postid: post.id
        };

        try {
            const token = localStorage.getItem('token');
            await fetch("http://localhost:8080/hold", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderId: paymentDetails.orderId,
                    postId: post.id,
                    name: post.username
                })
            });
            await paymentWidget?.requestPayment(paymentDetails);
        } catch (error) {
            console.error("Error requesting payment:", error);
        }
    };

    return (
        <div>
            {/* 결제 UI, 이용약관 UI 영역 */}
            <div id="payment-widget" />
            <div id="agreement" />
            {/* 결제하기 버튼 */}
            <button onClick={handlePaymentRequest}>결제하기</button>
        </div>
    );
}

export default CheckoutPage;
