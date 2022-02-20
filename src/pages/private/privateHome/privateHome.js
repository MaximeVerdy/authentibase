import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'

import { collection, addDoc, getDocs, deleteDoc, setDoc, doc, query, orderBy, limit } from "firebase/firestore";

import { db } from '../../../firebase-config';

export default function PrivateHome() {

     const [texts, setTexts] = useState([])
     const [first, setFirst] = useState('')
     const [reload, setReload] = useState(0)

     const formRef = useRef();
     let textRef = useRef()

     const ttr = async e => {
          e.preventDefault();

          try {
               // const docRef = await addDoc(collection(db, "textbase"), {
               //      champText: textRef.current.value,
               // });
               const newDoc = await setDoc(doc(db, "textbase", textRef.current.value), {
                    champText: textRef.current.value,
               });
               console.log("Document written with ID: ", newDoc);

          } catch (e) {
               console.error("Error adding document: ", e);
          }
          setReload(reload + 1)
          formRef.current.reset();
          textRef.current.focus();
     }

     useEffect(async () => {

          const querySnapshot = await getDocs(collection(db, "textbase"));

          setFirst(querySnapshot.docs[0].id)
          setTexts(querySnapshot.docs.sort((a, b) => b - a))
     }, [reload])

     const handleDel = async () => {
          try {
               await deleteDoc(doc(db, "textbase", first));
          } catch (e) {
               console.log(e);
          }
          setReload(reload + 1)
     }


     return (
          <div style={{
               display: 'flex',
               flexDirection: 'column',
               width: '100%',
               height: '400px',
               justifyContent: 'center',
               alignItems: 'center',
          }}>
               <h1 style={{
                    color: "white",
                    top: "50%"
               }}
               >
                    PRIVATE PAGE
               </h1>

               <div className='w-50 h-50'>
                    <form
                         onSubmit={ttr}
                         ref={formRef}
                    >
                         <label htmlFor='text' className='form-label'></label>
                         <input
                              ref={textRef}
                              name='text'
                              type='text'
                              className='form-control'
                              id='text'
                         ></input>
                         <button className='w-100 h-50 btn btn-primary'>Submit</button>

                    </form>
               </div>


               <div className="w-50 card">
                    <p className='card-title'>les entrées :</p>
                    {texts.map((el, i) => (
                         <p className='card-title' key={i}>
                              {el.data().champText}
                         </p>
                    ))}
                    <button onClick={handleDel} className='w-100 h-50 btn btn-primary'>Delete</button>
               </div>
          </div >
     )
}
