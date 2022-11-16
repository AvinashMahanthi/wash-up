import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%auto;
  justify-content: center;
  margin-left: 4rem;
  margin-right: 4rem;

  @media screen and (max-width: 768px) {
    height: 1100px;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;

    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  @media screen and (max-width: 320px) {
    height: 1300px;
    margin: 10px;
  }
`;

// height: 500px;
// position: absolute;
// z-index: 1;
export const ImgContainer = styled.div`
  width: 100%auto;

  minheight: "15.66667vw";
  height: "15.66667vw";
  padding: "0 1rem";
  @media screen and (max-width: 768px) {
    height: 1100px;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;

    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  @media screen and (max-width: 320px) {
    height: 1300px;
    margin: 10px;
  }
`;

export const SearchContainer = styled.div`
  width: 70%;
  height: 100%;
  white-space: nowrap;
  align-items: center;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    height: 1100px;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
`;

export const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  grid-gap: 15px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 786px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;
//align-items: center;
export const SearchCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  margin: 1rem

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const SearchIcon = styled.img`
  height: 12rem;
  width: 12rem;
  margin-bottom: 10px;
  align-items: start;
  border-radius: 1rem;
`;
export const SearchH1 = styled.h1`
  font-size: 1rem;
  color: #1167b1;
  line-height: 16px;
  font-weight: 600;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;
export const SearchH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const SearchP = styled.p`
  font-size: 1rem;
`;
