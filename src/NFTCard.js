import ImageListItem from '@material-ui/core/ImageListItem';
import IconButton from '@material-ui/core/IconButton';
import CheckRoundedIcon  from '@material-ui/icons/CheckRounded';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import useSWR from "swr";
import { fetcher } from "./utils/fetcher";

export const NFTCard = (props) => {
    
    let token;

    const { data} = useSWR(
        props.item.uri,
            fetcher,
            {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            }
    );
    
    const checkNFT = (token, item) => {
        if((localStorage.getItem('photo1') !== token) && (localStorage.getItem('photo2') !== token) &&(localStorage.getItem('photo3') !== token) && (localStorage.getItem('photo4') !== token))
            localStorage.setItem(item, token)
    }
    const closeDialog = (e) => {
        const temp = localStorage.getItem('object')
        document.getElementById("closeDialog").click();
        if(temp === '1')
            checkNFT(token, 'photo1')
        if(temp === '2')
            checkNFT(token, 'photo2')
        if(temp === '3')
            checkNFT(token, 'photo3')
        if(temp === '4')
            checkNFT(token, 'photo4')
            
    }
    
    if(data){
        token = data.image
    return (
        <ImageListItem key={props.key} style={{height:300, width:400}} >
            <img src={data.image} alt={props.item.title} />
            <ImageListItemBar
            title={data.name}
            subtitle={<span>{data.description}</span>}
            actionIcon={
                <IconButton onClick={closeDialog} aria-label={`info about ${data.image}`} className={props.classes.icon}>
                <CheckRoundedIcon />
                </IconButton>
            }
            />
        </ImageListItem>
    )
    }else{
        return <div>Loading...</div>
    }
  }