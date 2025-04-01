from django.urls import path
from api import views
from django.conf import settings
from django.conf.urls.static import static




# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DestinationViewSet, DestinationImageViewSet, BookingViewSet, MessageViewSet, ReviewViewSet, StarRatingViewSet, RoomViewSet, MessageAttachmentViewSet, UserViewSet, ContactViewSet, PostViewSet

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')
router.register(r'destination', DestinationViewSet, basename='destination')
router.register(r'destinationimage', DestinationImageViewSet,basename='destinationimage')
router.register(r'booking', BookingViewSet,basename='booking'  )
router.register(r'message', MessageViewSet,basename='message'  )
router.register(r'review', ReviewViewSet,basename='review'  )
router.register(r'starrating', StarRatingViewSet,basename='starrating'  )
router.register(r'room', RoomViewSet,basename='room'  )
router.register(r'messageattachment', MessageAttachmentViewSet,basename='messageattachment'  )
router.register(r'contact', ContactViewSet,basename='contact'  )
router.register(r'post', PostViewSet,basename='post'  )





urlpatterns = [
    path('', include(router.urls)),
    path('profile/', views.UserProfile.as_view(),name='profile'),
    path('test/', views.test,name='test'),
    path('register/',views.UserRegistrationView.as_view(),name='register'),
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('changeuserpassword/', views.ChangeUserPasswordView.as_view(),name='changeuserpassword'),
    # path('destination/',views.DestinationListCreateView.as_view(),name='destination'),
    # path('destination/<int:pk>/',views.DestinationRetrieveUpdateDeleteView.as_view(),name='destination2'),
    path('destinationslist/', views.DestinationLIstView.as_view(), name='DestinatinsList'),
    # path('destination/<int:pk>/',views.DestinationDetailView.as_view(),name='destinationDetail'),

]
