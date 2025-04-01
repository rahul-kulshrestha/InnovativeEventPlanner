from rest_framework.permissions import BasePermission

class IsAdminOrReadPostOnly(BasePermission):
    """
    Custom permission to only allow admin users to perform actions 
    other than GET and POST.
    """

    def has_permission(self, request, view):
        # Allow GET and POST requests for any user
        if request.method in ['GET', 'POST']:
            return True
        
        # Allow all other methods only for admin users
        return request.user and request.user.is_staff
