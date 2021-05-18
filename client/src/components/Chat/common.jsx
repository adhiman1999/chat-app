import styled from "styled-components";

export const ChatBody = styled.div`
  display: flex;
  background-color: #ededed;
  height: 90%;
  width: 90%;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.75);
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.32;
  @media (max-width: 756px) {
    flex: 1;
    //flex-direction: column;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-right: 1px solid lightgrey;
`;

export const SidebarHeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-items: space-between;
  min-width: 10%;
`;

export const SidebarSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: space-between;
  width: 100%;
`;

export const SidebarSearch = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-right: 1px solid lightgrey;
`;
