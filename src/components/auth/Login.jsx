import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
const { signIn } = useAuth()
const nav = useNavigate()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [err, setErr] = useState('')
const [loading, setLoading] = useState(false)


const onSubmit = async (e) => {
e.preventDefault()
setErr(''); setLoading(true)
try { await signIn(email, password); nav('/') } catch (e) { setErr(e.message) } finally { setLoading(false) }
}


return (
<div className="container">
<h1>Login</h1>
<form onSubmit={onSubmit}>
<input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
<input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
{err && <p style={{color:'crimson'}}>{err}</p>}
<button disabled={loading} type="submit">{loading ? 'Signing in…' : 'Login'}</button>
</form>
<p>New here? <Link to="/signup">Create an account</Link></p>
</div>
)
}