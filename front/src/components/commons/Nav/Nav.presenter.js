import * as S from "./Nav.styles"
import Logo from "../../../assets/Logo.png"
import HomeIcon from "../../../assets/home.svg";
import Xmark from "../../../assets/xmark(white).svg";
import Arrow from "../../../assets/arrow.svg"


export default function NavUI(props){
    return (
        <>
            <S.StyledNav>
                <S.NavTop>
                    <S.NavTopLeft>
                        <S.StyledLink to="/" onClick={() => props.handleLinkClick('/')}>
                            <img src={Logo} alt="Logo" style={{ height: "36px" }} />
                            <S.YgWDS>YgWDS</S.YgWDS>
                        </S.StyledLink>
                    </S.NavTopLeft>
                    <S.NavTopRight>
                        {!props.isLoggedIn ? (
                            <>
                                <S.Button width="80px">
                                    <S.StyledLink to="/login" onClick={() => props.handleLinkClick('/login')}>
                                        로그인
                                    </S.StyledLink>
                                </S.Button>
                                <S.Button width="100px">
                                    <S.StyledLink to="/signup" onClick={() => props.handleLinkClick('/signup')}>
                                        회원가입
                                    </S.StyledLink>
                                </S.Button>
                            </>
                        ) : (
                            <>
                                <S.Username>
                                    <S.StyledP color='#0279C2' fontSize="18px" fontWeight="bold">{props.username}</S.StyledP>
                                    <S.StyledP>&nbsp;님</S.StyledP>
                                </S.Username>
                                <S.Button>
                                    <S.StyledLink to="/logout">
                                        로그아웃
                                    </S.StyledLink>
                                </S.Button>
                            </>
                        )}
                    </S.NavTopRight>
                </S.NavTop>
                <S.NavBottomContainer>
                    <S.NavBottom>
                        <S.Styledul>
                            <S.Styledli selected={props.selectedItem === 0}>
                                <S.StyledLink to="/myposts" onClick={() => props.handleLinkClick('/myposts')}>내 신청</S.StyledLink>
                            </S.Styledli>
                            <S.Styledli selected={props.selectedItem === 1}>
                                <S.StyledLink to="/wastefee" onClick={() => props.handleLinkClick('/wastefee')}>폐기물 수수료 안내</S.StyledLink>
                            </S.Styledli>
                            <S.Styledli selected={props.selectedItem === 2}>
                                <S.StyledLink to="/wasteout" onClick={() => props.handleLinkClick('/wasteout')}>폐기물 배출하기</S.StyledLink>
                            </S.Styledli>
                            <S.Styledli selected={props.selectedItem === 3}>
                                <S.StyledLink to="/allposts" onClick={() => props.handleLinkClick('/allposts')}>전체 신청 현황</S.StyledLink>
                            </S.Styledli>
                        </S.Styledul>
                    </S.NavBottom>
                </S.NavBottomContainer>
            </S.StyledNav>
            <S.StyledDiv />
    
            {/* 모바일 */}
            <S.MobileHamburger onClick={props.handleToggle}>
                <div />
                <div />
                <div />
            </S.MobileHamburger>
            {props.isOpen && (
                <S.MobileNavContainer onClick={props.handleOverlayClick}>
                    <S.MobileNavMenu>
                        <S.MobileNavTop>
                            <div>
                                <a href="/">
                                    <img src={HomeIcon} alt="home" />
                                </a>
                            </div>
                            <div onClick={props.handleToggle}>
                                <img src={Xmark} alt="Xmark" />
                            </div>
                        </S.MobileNavTop>
                        {!props.isLoggedIn ? (
                            <>
                                <S.MobileStyledLink to="/login" onClick={() => props.handleLinkClick('/login')} alt={"light"}>
                                    로그인
                                    <img src={Arrow} alt="arrow" />
                                </S.MobileStyledLink>
                                <S.MobileStyledLink to="/signup" onClick={() => props.handleLinkClick('/signup')} alt={"light"}>
                                    회원가입
                                    <img src={Arrow} alt="arrow" />
                                </S.MobileStyledLink>
                            </>
                        ) : (
                            <>
                                <S.MobileStyledLink alt={"light"}>{props.username}</S.MobileStyledLink>
                                <S.MobileStyledLink to="/logout" onClick={() => props.handleLinkClick('/logout')} alt={"light"}>
                                    로그아웃
                                    <img src={Arrow} alt="arrow" />
                                </S.MobileStyledLink>
                            </>
                        )}
                        <S.MobileStyledLink to="/myposts" onClick={() => props.handleLinkClick('/myposts')}>
                            내 신청
                            <img src={Arrow} alt="arrow" />
                        </S.MobileStyledLink>
                        <S.MobileStyledLink to="/wastefee" onClick={() => props.handleLinkClick('/wastefee')}>
                            폐기물 수수료 안내
                            <img src={Arrow} alt="arrow" />
                        </S.MobileStyledLink>
                        <S.MobileStyledLink to="/wasteout" onClick={() => props.handleLinkClick('/wasteout')}>
                            폐기물 배출하기
                            <img src={Arrow} alt="arrow" />
                        </S.MobileStyledLink>
                        <S.MobileStyledLink to="/allposts" onClick={() => props.handleLinkClick('/allposts')}>
                            전체 신청 현황
                            <img src={Arrow} alt="arrow" />
                        </S.MobileStyledLink>
                    </S.MobileNavMenu>
                </S.MobileNavContainer>
            )}
        </>
    );
}