import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "./contact";
import { Action } from "@progress/kendo-react-dateinputs";

interface ContactState{
    contacts:Contact[];
}

const initialState : ContactState= {

    contacts : [],
}

export const contactSlice = createSlice({
    name:'contact',
    initialState,
    reducers:{
                // 1st Reducer
                AddContcts:(state, action:PayloadAction<Contact[]>) =>
                {
                    action.payload.forEach((contact) => {
                        state.contacts.push(contact)
                    })
                },
                // 2nd reducer
                AddRecord:(state,action:PayloadAction<Contact>)=>
                {state.contacts.push(action.payload)},
                // 3th reducer
                RemoveRecord:(state,action:PayloadAction<string>)=>
                {const RecordToRemove=state.contacts.find
                    (contact=>contact.id===action.payload);
                    if(RecordToRemove)
                    {
                        state.contacts.filter(
                            (contact=>contact.id !== action.payload));
                    }
            }

        }});
        // every reducer in the Slice must be export
        // with spacific name with spasific name  
        export const {AddRecord,RemoveRecord, AddContcts}=contactSlice.actions;
        
