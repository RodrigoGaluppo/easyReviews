import React, {useState,useCallback,useRef } from "react"
import {Container,Info,Text,Search} from "./styles"
import {Link,useHistory} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import {useToast} from "../../hooks/ToastContext"
import {FiArrowLeft} from "react-icons/fi"
import {FaBuilding, FaCity, FaLink, FaPen} from "react-icons/fa"
import Input from "../../components/Input"
import TextArea from "../../components/TextArea"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import api from "../../services/apiClient"

interface IFilter{
    score:number
    comment:string
}



const CreateCompany:React.FC = ()=>{
    const {addToast} = useToast()
    const history = useHistory()
    const {token,signOut} = useAuth()
    const formRef = useRef<FormHandles>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const handleSubmit = useCallback(async (data:IFilter)=>{ 

        setIsLoading(true) 
        api.post(`/company`,{
            ...data,country:"portugal"
        },{headers:{"authorization" : `Bearer ${token}`}})

        .then((res)=>{
            console.log(res);
            
            addToast({type:"success",title:"success",description:"company successfully published"})

            history.push(`/view_company/${res.data.newCompany.id}`)

            setIsLoading(false)
        })
        .catch(e=>{

            setIsLoading(false)

            if(!!e.request && e.request.status === 401)
                signOut()
            
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
            
        })
    },[ token, addToast, history, signOut])
    
    return(
        
        <>
            <Info>
                <span>
                    <Link to={`/profile`}>
                        <FiArrowLeft size={22} ></FiArrowLeft>
                    </Link>
                </span>
                <h1><strong>Publish your Business</strong></h1>
            </Info>
            <Container>
                <Text>
                    <h1>Fill the following fields to publish your business in our app :)</h1>
                </Text>
                <Search>
                    <Form ref={formRef} onSubmit={handleSubmit} >

                        <Input  placeholder="name of the business" icon={FaBuilding} name="name" ></Input>
                        <TextArea  placeholder="short description" icon={FaPen} name="description" ></TextArea>
                        <Input  placeholder="city of location" icon={FaCity} name="city" ></Input>
                        <Input  placeholder="link of a social network" icon={FaLink} name="site_url" ></Input>
                
                        <Button>Publish</Button>
                    </Form>
                </Search>
                {isLoading && <Loading></Loading>}
            </Container>
        </>
    )
}
export default CreateCompany
