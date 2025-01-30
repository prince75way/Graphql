
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FaUsers, FaComments, FaMailBulk } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Homepage = () => {
  const {  inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <Container sx={{ textAlign: 'center', paddingTop: '40px' }}>
      {/* Title Animation - Typing Effect */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h3" gutterBottom sx={{ color: '#4CAF50' }}>
          Welcome to ChatSphere!
        </Typography>
      </motion.div>

      {/* Chat Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <FaComments size={100} color="#4CAF50" />
      </motion.div>

      {/* Stats Section with Animation */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Typography variant="h6" sx={{ marginTop: '20px' }}>
          Your space to chat with your teams, friends, and communities.
        </Typography>
      </motion.div>

      {/* Stats Grid with Counting */}
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: '40px' }}>
        {/* Followers Section */}
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Paper sx={{ padding: '20px', textAlign: 'center' }}>
              <FaUsers size={40} color="#007BFF" />
              <Typography variant="h6">Followers</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: "red" }}>
                {inView && (
                  <CountUp
                    start={0}
                    end={1500}
                    duration={2.5}
                    separator=","
                  />
                )}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Active Users Section */}
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Paper sx={{ padding: '20px', textAlign: 'center' }}>
              <FaUsers size={40} color="#28a745" />
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: "red" }}>
                {inView && (
                  <CountUp
                    start={0}
                    end={3200}
                    duration={2.5}
                    separator=","
                  />
                )}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* Messages Sent Section */}
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <Paper sx={{ padding: '20px', textAlign: 'center' }}>
              <FaMailBulk size={40} color="#ffc107" />
              <Typography variant="h6">Messages Sent</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: "red" }}>
                {inView && (
                  <CountUp
                    start={0}
                    end={15000}
                    duration={2.5}
                    separator=","
                  />
                )}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Create Your Own Group Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <Box sx={{ marginTop: '60px' }}>
          <Typography variant="h5" sx={{ color: '#007BFF', fontWeight: 'bold' }}>
            Create Your Own Group
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '20px', color: '#555' }}>
            Start a group for your friends, team members, or community. It's simple, fun, and easy to manage.
          </Typography>
          <Box sx={{ marginTop: '20px' }}>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              Create Group
            </motion.button>
          </Box>
        </Box>
      </motion.div>

      {/* Invite Users Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <Box sx={{ marginTop: '60px' }}>
          <Typography variant="h5" sx={{ color: '#007BFF', fontWeight: 'bold' }}>
            Invite Users to Your Group
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '20px', color: '#555' }}>
            Invite your friends and colleagues to join your group. Share ideas, make plans, and stay connected.
          </Typography>
          <Box sx={{ marginTop: '20px' }}>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
            >
              Invite Users
            </motion.button>
          </Box>
        </Box>
      </motion.div>

    </Container>
  );
};

export default Homepage;
