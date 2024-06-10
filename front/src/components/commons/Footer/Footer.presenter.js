import * as S from "./Footer.styles";

export default function FooterUI() {
    return (
        <S.StyledFooterWrapper>
            <S.FooterText fontWeight="bold" fontSize="m">
            한국해양대학교 인공지능공학부 캡스톤디자인
            </S.FooterText>
            <S.FooterText fontWeight="normal">
            YOLOv7을 활용한 영도구 폐기물 처리시스템
            </S.FooterText>
        </S.StyledFooterWrapper>
    );
};