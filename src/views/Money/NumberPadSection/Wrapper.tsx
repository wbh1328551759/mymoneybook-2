import styled from 'styled-components';

const Wrapper = styled.section`
  >.output{
    background: #f9f9f9;
    font-size: 36px;
    line-height: 66px;
    text-align: right;
    padding: 0 16px;
    box-shadow: inset 0 -6px 5px -5px rgba(0,0,0,0.25),
                inset 0 6px 5px -5px rgba(0,0,0,0.25);
    color:#38cbee;
    font-family: "Segoe UI" , monospace;
  }
  >.pad{
    > button{
        float:left;
        width: 25%;
        height:64px;
        border:none;
        background: #f9f9f9;
        font-size: 20px;
        box-shadow: 0 0 5px #d3d3d3;
      &.ok{
        height: 128px;
        float: right; 
        background: #46c9e7;
        color: white;
        > .icon{
          width: 25px;
          height: 215px;  
        }
      }
      &.goBack{
         background: #f3f3f3; 
         font-size: 25px;
         display: flex;
         justify-content: center;
         align-items: center;
        > span {
          display: none;
        }
      }
      &.clear{
         background: #f3f3f3; 
         font-family: Segoe UI,monospace;
         font-size: 25px;
      }
      &.zero{
        width: 50%;
      }
    }
  }
`;

export {Wrapper};