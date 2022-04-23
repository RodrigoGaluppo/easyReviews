import React, {useState,useEffect,useRef, useCallback } from "react"
import {Container,Info,Text,Search} from "./styles"
import {Link,useHistory,useRouteMatch} from "react-router-dom"
import {useAuth} from "../../hooks/AuthContext"
import {FormHandles} from "@unform/core"
import {Form} from "@unform/web"
import {useToast} from "../../hooks/ToastContext"
import {FiArrowLeft} from "react-icons/fi"
import {FaBuilding, FaCamera, FaCity, FaLink, FaPen} from "react-icons/fa"
import Input from "../../components/Input"
import TextArea from "../../components/TextArea"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import api from "../../services/apiClient"

interface ICompany{
    name:string 
    description:string 
    city:string 
    site_url:string 
}


interface IParams{
    company_id:string | undefined
}

const CreateCompany:React.FC = ()=>{
    const {addToast} = useToast()
    const history = useHistory()
    const {token,signOut} = useAuth()
    const formRef = useRef<FormHandles>(null)
    const UploadFormRef = useRef<FormHandles>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const { params } = useRouteMatch<IParams>()
    const [company,setCompany] = useState<ICompany>()
    const [file,setFile] = useState<File>()

    useEffect(()=>{
        api.get(`company/${params.company_id}`,{headers:{authorization:`Bearer ${token}`}})
        .then((res)=>{
            setCompany(res.data) 
        })
        .catch(e=>{
            if(!!e.request && e.request.status === 401)
            {
                signOut()
                addToast({type:"error","title":"faça login"})
            }
            
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
        })


    /* eslint-disable react-hooks/exhaustive-deps */
    },[])

    const handleSubmit = async (data:ICompany)=>{ 

        // eslint-disable-next-line eqeqeq
        if(data.city == company?.city && data.description == company?.description && data.name == company?.name && data.site_url == company?.site_url )
            return

        setIsLoading(true) 
        api.put(`/company`,{
            company_id:params.company_id,
            ...data
        },{headers:{"authorization" : `Bearer ${token}`}})

        .then(()=>{
 
            addToast({type:"success",title:"success",description:"your business was successfully updated"})

            history.push(`/view_company/${params.company_id}`)

            setIsLoading(false)
        })
        .catch(e=>{
            console.log(e);
            
            setIsLoading(false)

            if(!!e.request && e.request.status === 401)
            {
                signOut()
                addToast({type:"error","title":"faça login"})
            }
            
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
            
        })
    }

    const handelChangeFile = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files)
            setFile(e.target.files[0])
    }

    const handleUpload = async ()=>{

        const formData = new FormData()

        if(params.company_id)
            formData.append("company_id",params.company_id)

        if(file)
            formData.append("profile_img",file)

        api.post(`/company/upload`,formData,{
            headers:{
                "authorization" : `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            },
        }
        )

        .then(()=>{
    
            addToast({type:"success",title:"success",description:"business picture updated successfully"})

            history.push(`/view_company/${params.company_id}`)

            setIsLoading(false)
        })
        .catch(e=>{
            console.log(e);
            
            setIsLoading(false)

            if(!!e.request && e.request.status === 401)
            {
                signOut()
                addToast({type:"error","title":"faça login"})
            }
            
            addToast({type:"error",title:"something went wrong",description:"could not load the request"})
            
        })    

    }

    const handleDelete = useCallback(async ()=>{
        
        api.delete(`company/${params.company_id}`,{headers:{authorization:`Bearer ${token}`}})
        .then(()=>{
            addToast({type:"success",title:"your business was successfully deleted"})
            history.push("/profile")
        })
        .catch(()=>{
            addToast({type:"error",title:"it was not possible to delete your business"})
            
        })

        
    },[])

    return(
        
        <>
            <Info>
                <span>
                    <Link to={`/profile`}>
                        <FiArrowLeft size={22} ></FiArrowLeft>
                    </Link>
                </span>
                <h1><strong>Update your Business</strong></h1>
            </Info>
            <Container>
                <Text>
                    <h1>General Info</h1>
                </Text>
                <Search>
                    <Form ref={formRef} onSubmit={handleSubmit} >

                        <Input defaultValue={company?.name}  placeholder="name of the business" icon={FaBuilding} name="name" ></Input>
                        <TextArea defaultValue={company?.description}   placeholder="short description" icon={FaPen} name="description" ></TextArea>
                        <Input defaultValue={company?.city}  placeholder="city of location" icon={FaCity} name="city" ></Input>
                        <Input defaultValue={company?.site_url}  placeholder="link of a social network" icon={FaLink} name="site_url" ></Input>
                
                        <Button >Update</Button>
                    </Form>
                </Search>
              
                <Text>
                    <h1>Business Picture</h1>
                </Text>

                <Search>
                    <Form ref={UploadFormRef} onSubmit={handleUpload} >

                        <Input type="file" onChange={(e)=>handelChangeFile(e)}  placeholder="business picture" icon={FaCamera} name="profile_img" ></Input>
                        
                        <Button>Update business picture</Button>
                    </Form>
                    
                </Search>
                <Button onClick={handleDelete} style={{background:"#f85d5d"}} >Deletar Negócio</Button>
                

                {isLoading && <Loading></Loading>}
            </Container>
        </>
    )
}
export default CreateCompany
