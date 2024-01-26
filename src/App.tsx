import { Grid, GridColumn } from "@progress/kendo-react-grid";
import axios from  "axios";
import { useState,useEffect } from "react";
import "@progress/kendo-theme-bootstrap/dist/all.css"
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from "@progress/kendo-react-buttons";
import {useAppDispatch, useAppSelector} from "./store";

import { FormInput,
      FormRadioGroup,
      FormComboBox       
} from './form-components';

import {
    emailValidator, nameValidator,requiredValidator
     
    
} from './validators'
import { AddContcts } from "./ContactSlice";
interface confirmationDataInterface {
  label: string;
  value: string;
}

interface Contact {
   id: string;
   fullName: string;
   email: string;
   confirmationType: string;
   gender: string;
  }

const App = () => {
  const [todelete,setToDelete]=useState('');  
  const [contact,setContact] = useState<Contact>();
  const [editMode,setEditMode]=useState(1);
  const[con,setCon]=useState<Contact[]>([]);
  const dispatch = useAppDispatch();
  console.log('todelete',todelete);

  const fetchCon=async ()=>{
      const response= await axios.get('http://localhost:3001/contacts');
      const contactsArray = 
      response.data.map(item => item.contact);
      // normal method to change state
      setCon(contactsArray)
    // change state using redux
      dispatch(AddContcts(con));
      };
  
      useEffect(()=>{
    fetchCon();
},[]);

    const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];  
  const confirmationData: Array<confirmationDataInterface> = [
    { label: "Phone Call", value: "phone" },
    { label: "Via Email", value: "email" },
  ]; 

   function handleEdit(dataItem:any) {
      const contact : Contact = {id: dataItem.id,
        fullName: dataItem.fullName,
        email: dataItem.email,
        confirmationType: dataItem.confirmationType,
        gender:dataItem.gender.value
         }
        axios.put(`http://localhost:3001/contacts/${todelete}`, 
         {contact})
      const conFiltered=  con.filter((contact)=>{return contact.id !== todelete})
      console.log('conFiltered',conFiltered)
      const newContact = [...conFiltered, contact]
      console.log('newContact',newContact)
      console.log('contact',contact)
      newContact.sort((a, b) => parseInt(a.id) - parseInt(b.id))
      setCon(newContact);
  }
  async function handleDeleteClick()
  {
    console.log(todelete);
    alert('you want to delete this record?')
  const deleteContactByID = 
  await axios.delete(`http://localhost:3001/contacts/${todelete}`)
  if (deleteContactByID.status===200)
  {
  console.log(deleteContactByID)
   const newarray=con.filter((contact: Contact) => {return contact.id !== todelete})
   setCon(newarray)  
  }  
}; 

  
    async function handleSubmit(dataItem: any)
    {
        console.log('dataItem', dataItem)
        if (editMode===1)
        {
        const contact : Contact = {id: dataItem.code,
                         fullName: dataItem.fullName,
                         email: dataItem.email,
                         confirmationType: dataItem.confirmationType,
                         gender:dataItem.gender.value
                          }
        
          const response = 
          await axios.post('http://localhost:3001/contacts', 
          {contact,}
          );
          const newContact = [...con, contact]
          console.log('Response', response)
          console.log('newContact', newContact)
          setCon(newContact);
                        }else{
                        handleEdit(dataItem)  
                        }
    
    }
// custom grid cell for order item selection
const ContactIdCell = (props: any) => {
  return (
      <td>
          <Button
              onClick={() => handleSelectContact(props.dataItem.id)}
          >
              {props.dataItem.id }
          </Button>
      </td>
  )
}
  // handle order item selection from grid for editing
  function handleSelectContact(id: string) {
    // get the order item from the orderItemsAndAdjustments state
    const selectedContact: Contact | undefined = con!.find((contact: Contact) =>
        id === contact.id);

        setToDelete(id);
console.log('selectedContact',selectedContact)

    // set the selected order item in state and start edit mode
    setContact(selectedContact);
    setEditMode(2);
}
    return (
      <>
      <Form
        onSubmit={handleSubmit}
        initialValues={contact}
        key={contact&&contact!.id}
        render={() => (
          <FormElement style={{width: 400}}>
            <fieldset className={'k-form-fieldset'}>
              <legend className={'k-form-legend'}>BOOK YOUR DREAM VACATION TODAY</legend>
              <Field
                // onChange={()=>HandleCodeChange()}
                id={'id'}
                name={'id'}
                label={'Code :'}
                component={FormInput}
                validator={requiredValidator}
                        />
              
              <Field
                id={'fullName'}
                name={'fullName'}
                label={'Full Name'}
                component={FormInput}
                validator={nameValidator}
                        />
              <Field
                id={'email'}
                name={'email'}
                label={'Email'}
                hint={'Hint: Enter your personal email address.'}
                type={'email'}
                component={FormInput}
                validator={emailValidator}
                        />
              <Field
                id={"confirmationType"}
                name={"confirmationType"}
                label={"Type of Confirmation"}
                hint={"Hint: Choose a way to receive a confirmation"}
                layout={"horizontal"}
                component={FormRadioGroup}
                data={confirmationData}
              />
            <Field
            id={"gender"}
            name={"gender"}
            label={"Gender"}
            component={FormComboBox}
            textField={"label"}
            data={genders}
            validator={requiredValidator}
          />              
           <div className="k-form-buttons">
            {/* -----(Add Button)--- */}
              <Button
                themeColor={"primary"}
                type={"submit"}
                >
                {editMode === 1 ? 'Add' : 'Edit'}
              </Button>
            {/* -----(Edit Button)--- */}
            {/* -----(Delete Button)--- */}
            <Button
                onClick={handleDeleteClick}
                themeColor={"primary"}
                type={"submit"}
              >
                Delete
              </Button>
            {/* -----(Browse Button)--- */}
            <Button
                themeColor={"primary"}
                type={"submit"}
              >
                Browse
              </Button>
                {/* -----(Exit Button)--- */}
              <Button
                themeColor={"primary"}
                type={"submit"}
              >
                Exit
              </Button>

            </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
              </div>
            </fieldset>
          </FormElement>
            )}
            />
            <div>
                <Grid style={{ height: "200px" }} data={con}>
                  <GridColumn field="id" title="ID" width="40px" cell={ContactIdCell}/>
                  <GridColumn field="fullName" title="Name" width="250px" />
                  <GridColumn field="email" title="Email" width="250px"/>
                  <GridColumn field="confirmationType" title="Conf" width="100px"/>
                  <GridColumn field="gender" title="Gen" width="100px"/>
                </Grid>
              </div>
     </>         
    );
    

  };
  

export default App;