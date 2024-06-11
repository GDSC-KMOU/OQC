import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function FailPage() {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        alert("결제에 실패하였습니다.");
        window.location.href = "/myposts";
    }, []);

    return null;
}