import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledChat = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  & .intro {
    text-align: center;
    & > h1 {
      font-size: 3.5rem;
    }
    & > button {
      margin-top: 1rem;
      padding: 0.75rem 2rem;
      font-size: 2rem;
      border-radius: 5rem;
      border: 1px solid rgb(var(--dark-color));
      transition: 0.15s;
      &:active {
        transform: scale(0.95);
        border-color: rgb(var(--primary-color));
      }
    }
  }
  
`;

const Chat = () => {
  const navigateTo = useNavigate()
  return (
    <StyledChat>
      <div className="intro">
        <h1>Enter into Student Info System</h1>
        <button onClick={()=>{navigateTo('/layout')}}>
          Guest Login
        </button>
      </div>
    </StyledChat>
  );
};

export default Chat;