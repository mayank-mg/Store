import styled from 'styled-components';

export const ButtonContainer=styled.button`
margin-left:0.5rem;
text-transform:capitalize;
background:transparent;
font-size:1.2rem;
border:0.05rem solid var(--lightblue);
border-color:${props=>props.cart? "var(--mainyellow)":"var(--lightblue)"};
color:var(--lightblue);
color:${props=>props.cart?"var(--mainyellow)":"var(--lightblue)"};
border-radius:0.5rem;
padding:0.2rem 0.5rem;
cursor:pointer;
transition:all 0.5 ease-in-out;
&:hover{
    background:var(--lightblue);
    background:${props=>props.cart?"var(--mainyellow)":"var(--lightblue)"};
    color:var(--mainblue);
}
&:focus{
    outline:none;
}

`