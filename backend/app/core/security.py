import firebase_admin
from firebase_admin import auth, credentials
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.models.user import User

# Initialize Firebase Admin
# In production, GCP automatically finds credentials via Service Account
firebase_admin.initialize_app()

security = HTTPBearer()

async def get_current_user(res: HTTPAuthorizationCredentials = Depends(security)) -> User:
    try:
        # Verify the Firebase ID Token
        decoded_token = auth.verify_id_token(res.credentials)
        uid = decoded_token.get("uid")
        
        # Fetch user from MongoDB
        user = await User.find_one(User.firebase_uid == uid)
        if not user:
            raise HTTPException(status_code=404, detail="User not registered in Portal")
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication: {str(e)}",
        )