import {
  Box,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/store'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ChatPage() {
  const user = useStore(state => state.user)
  const messages = useStore(state => state.messages)
  const addMessage = useStore(state => state.addMessage)
  const logout = useStore(state => state.logout)

  const [input, setInput] = useState('')

  const navigate = useNavigate()

  const handleSend = () => {
    if (!input.trim()) return

    addMessage({
      role: 'user',
      content: input,
    })

    // TODO: Add AI response
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: 'This is a mock AI response to: ' + input,
      })
    }, 500)

    setInput('')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/user/detail', {
        withCredentials: true,
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          py: 2,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          AI Chat
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {user.name}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              sx={{
                ml: 2,
                textTransform: 'none',
                borderRadius: 2,
                px: 2,
                py: 0.5,
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {messages.map(message => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent:
                  message.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '80%',
                  p: 2,
                  borderRadius: 3,
                  bgcolor:
                    message.role === 'user'
                      ? 'primary.main'
                      : 'background.paper',
                  color:
                    message.role === 'user' ? 'common.white' : 'text.primary',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '8px 12px 8px 0',
                    borderColor:
                      message.role === 'user'
                        ? 'transparent primary.main transparent transparent'
                        : 'transparent background.paper transparent transparent',
                    right: message.role === 'user' ? 'auto' : '-12px',
                    left: message.role === 'user' ? '-12px' : 'auto',
                    top: '12px',
                    transform:
                      message.role === 'user' ? 'rotate(180deg)' : 'none',
                  },
                }}
              >
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {message.content}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 1,
                    textAlign: 'right',
                    color:
                      message.role === 'user'
                        ? 'primary.light'
                        : 'text.secondary',
                  }}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  borderColor: 'divider',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            sx={{
              px: 3,
              borderRadius: 2,
              fontWeight: 600,
              minWidth: 100,
              background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
