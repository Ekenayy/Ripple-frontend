import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BASE_URL, HEADERS } from '@env'
import {useForm} from 'react-hook-form'
import { useHistory } from "react-router-dom"

function CreateChallenge ( { currentUser }) {

  const [challenge, setChallenge] = useState()
  const [assignments, setAssignments] = useState([])
  const [challengeClicked, setChallengeClicked] = useState(false)
  const [taskClicked, setTaskClicked] = useState(false)
  const {register, handleSubmit, setValue} = useForm()
  const [errors, setErrors] = useState([])

  let history = useHistory()
  
    useEffect(() => {
      register('name')
      register('description')
      register('genre')
      register('videoUrl')
      register('photoUrl')
      register('task1')
      register('task2')
      register('task3')
    }, [register])

    const Form = styled.ScrollView`
      padding-left:12px;
      padding-bottom: 55px;
    `

    const TitleView = styled.View`
        padding:12px;
        margin-bottom:0px;
    `
    const Input = styled.TextInput`
        background: #F3F5F6;
        width: 100%;
        border-radius:20px;
        padding-left: 12px;
        height: 30px;
        margin-top: 20px;
        border-radius: 20px;
    `

    const FormTitle = styled.Text`
      font-size: 24px;
      color: #F7F8F3;
      align-self: center;
    `

    const Button = styled.TouchableOpacity`
        background: #03DAC5;
        width: 140px;
        margin: 12px;
        border-radius:20px;
        align-self: center
    `
    const TaskButton = styled.TouchableOpacity`
        background: #03DAC5;
        width: 160px;
        margin: 12px;
        border-radius:20px;
        align-self: center
    `


    const Span = styled.Text`
        color: #F7F8F3
        padding: 12px;
        align-self: center
    `

    const MainText = styled(Span)`
      font-size: 18px;
      color: #F7F8F3;
    `

    const DoneView = styled.View`
      flex-direction: column;
    `

    const ImageView = styled.View`
      padding: 12px;
    `

    const Image = styled.Image`
      width: 100%;
      height: 180px;
    `

    const ErrorSpan = styled(Span)`
        color: white
        font-size: 12px;
    `

    const ErrorView = styled.View`
      padding: 12px;
    `


    const onChallengeSubmit = data => {

      setErrors([])

      let formBody = {
          name: data.name,
          description: data.description,
          genre: data.genre,
          photo_url: data.photoUrl,
          video_url: data.videoUrl,
          user_id: currentUser.id
      }



      fetch(`${BASE_URL}/challenges`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formBody)
      })
        .then(r => r.json())
        .then(data => {
          if (data.errors) {
            setErrors(data.errors)
          } else
          setChallenge(data)
          // setChallengeClicked(true)
        })
        // .then(() => setChallengeClicked(true))
    }

    useEffect(() => {
      if (challenge) {
        setChallengeClicked(true)
      }
    }, [challenge])

    const onTaskSubmit = data => {

      let taskArray = [
        data.task1,
        data.task2,
        data.task3
      ]

      let fetchedTaskArray = [

      ]

        taskArray.forEach(task => {
          // The description is just the inputs entered from the user

          let formBody = {
            description: task
          } 

          
          fetch(`${BASE_URL}/tasks`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
          })
            .then(r => r.json())
            .then(fetchedTask => fetchedTaskArray.push(fetchedTask))
        })

        setAssignments(fetchedTaskArray)
        setTaskClicked(true)

    }


    // Creating the association between challenges and tasks
      const onFinalSubmit = data => {

        assignments.forEach(assignment => {

          let formBody = {
                task_id: assignment.id,
                challenge_id: challenge.id
          }

          fetch(`${BASE_URL}/task_challenges`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
          })
            .then(r => r.json())
            .then(() => history.push(`/challenges/${challenge.id}`))
        })

      }

      const errorsList = errors.map( (error) => {
        return <ErrorSpan>{error}</ErrorSpan>
      })

      function AssignmentList () {
        if (challengeClicked && !taskClicked) {
          return (
          <>
            <MainText> Add Your Assignments </MainText>
            <Input 
                placeholder="Assignment 1"
                onChangeText={text => setValue('task1', text)}
            />
            <Input 
                placeholder="Assignment 2"
                onChangeText={text => setValue('task2', text)}
            />
            <Input 
                placeholder="Assignment 3"
                onChangeText={text => setValue('task3', text)}
            />
            <TaskButton onPress={handleSubmit(onTaskSubmit)}>
                <Span>Create Assignments</Span>
            </TaskButton>
          </> 
          )
        }
        else if (taskClicked) {

          return (
            <FormTitle>Assignments Created</FormTitle>
          )
        } else {
          return null
        }
      }

        return (
          <Form>
          <TitleView>            
              <FormTitle>Create Your Challenge</FormTitle>
          </TitleView>
          { challengeClicked ? 
          <DoneView>
            <Span>{challenge.name}</Span> 
            <ImageView>
                  <Image source={{uri: challenge.photo_url}}/>
                </ImageView>
          </DoneView>
          : 
          <> 
            <Input 
                placeholder="Name"
                onChangeText={text => setValue('name', text)}
            />
            <Input 
                placeholder="Description"
                onChangeText={text => setValue('description', text)}
            />
            <Input 
                placeholder="Genre (i.e. Forgiveness, self care, empathy, mixed)"
                onChangeText={text => setValue('genre', text)}
            />
            <Input 
                placeholder="Youtube Url (Optional)"
                onChangeText={text => setValue('videoUrl', text)}
            />
            <Input 
                placeholder="Photo Url"
                onChangeText={text => setValue('photoUrl', text)}
            />
            <Button onPress={handleSubmit(onChallengeSubmit)}>
                <Span>Create Challenge</Span>
            </Button>
          </>
            }
            <AssignmentList/>
            {taskClicked ? 
            <Button onPress={handleSubmit(onFinalSubmit)}>
                <Span>Finalize</Span>
            </Button> 
            : null}
            {errors ? <ErrorView>
              {errorsList}
            </ErrorView>
            : null
            }
      </Form>    
        )

}
    
    export default CreateChallenge