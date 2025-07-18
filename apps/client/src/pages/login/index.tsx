import { Button, Container, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/store'

const LoginPage = () => {
  const login = useStore(state => state.login)

  const navigate = useNavigate()

  const handleGitHubLogin = () => {
    // 模拟GitHub登录逻辑
    login({
      id: 'user_123',
      name: 'GitHub User',
      avatar: 'https://avatars.githubusercontent.com/u/123456?v=4',
      token: 'mock_github_token',
    })
    window.location.href = 'http://localhost:8080/auth/github'

    // 模拟延迟，实际应用中可以移除
    setTimeout(() => {
      // 或者使用React Router的编程式导航
      // navigate('/chat'); 
    }, 1000)
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw !important',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Box
        sx={{
          margin: 'auto',
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 4,
          bgcolor: 'background.paper',
          boxShadow: 24,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: 700,
            background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          AI Chat
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleGitHubLogin}
          sx={{
            width: '100%',
            py: 1.5,
            borderRadius: 2,
            fontSize: 16,
            fontWeight: 600,
            background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Continue with GitHub
        </Button>
      </Box>
    </Container>
  )
}

export default LoginPage
