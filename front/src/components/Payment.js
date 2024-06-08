import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import styled from "styled-components";

const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

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
            await fetch("https://api.capserver.link/hold", {
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
        <PaymentWrapper>
            <PaymentContent>
                {/* 결제 UI, 이용약관 UI 영역 */}
                <div id="payment-widget" style={{width: "100%"}}/>
                <div id="agreement" />
                {/* 결제하기 버튼 */}
                <PaymentButtonWrapper>
                <PaymentButton onClick={handlePaymentRequest}>결제하기</PaymentButton>
                </PaymentButtonWrapper>
                
            </PaymentContent>
        </PaymentWrapper>
    );
}

export default CheckoutPage;

const PaymentWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const PaymentContent = styled.div`
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 24px;
    margin-top: 48px;
    @media (max-width: 768px) {
        width: 95%;
        padding: 0 0 24px 0;
    }
`
const PaymentButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
const PaymentButton = styled.button`
    width: 100%;
    height: 36px;
    background-color: #0D6EFD;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #0257d5;
        transition: 0.3s;
    }
    @media (max-width: 768px) {
        width: 90%;
    }
`
