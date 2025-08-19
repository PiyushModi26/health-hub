import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


export default function SignUp() {
const { signUp } = useAuth()
const nav = useNavigate()
const [fullName, setFullName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [err, setErr] = useState('')
const [loading, setLoading] = useState(false)


const onSubmit = async (e) => {
e.preventDefault()
setErr(''); setLoading(true)
try {
await signUp(email, password, fullName)
// Depending on your Supabase email settings, user may need to confirm email
nav('/');
} catch (e) { setErr(e.message) } finally { setLoading(false) }
}


return (
<div className="container">
<h1>Create account</h1>
<form onSubmit={onSubmit}>
<input placeholder="Full name" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
<input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
<input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
{err && <p style={{color:'crimson'}}>{err}</p>}
<button disabled={loading} type="submit">{loading ? 'Signing up…' : 'Sign Up'}</button>
</form>
<p>Already have an account? <Link to="/login">Login</Link></p>
</div>
)
}