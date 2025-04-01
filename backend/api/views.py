from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from api.serializers import UserRegisterSerializer, UserLoginSerializer, ChangeUserPasswordSerializer,DestinationSerializer, DestinationListSerializer, DestinationDeatilSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from api.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import BasicAuthentication
from django.views.decorators.csrf import csrf_exempt
from api.models import Destination

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Destination, DestinationImage, Booking, Message, Review, StarRating, Room,MessageAttachment, User, Contact, Post
from .serializers import DDestinationSerializer, DDestinationImageSerializer, BBookingSerializer, MMessageSerializer, RReviewSerializer,SStarRatingSerializer, RRoomSerializer, UserSerializer, MMessageAttachmentSerializer, CContactSerializer, PPostSerializer
from django_filters.rest_framework import DjangoFilterBackend
from api.custompermission import IsAdminOrReadPostOnly
# from django_filters.rest_framework import OrderingFilter
from rest_framework.filters import OrderingFilter

# Create your views here.
def test(request):
    return HttpResponse('hello world')

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    # renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        email = request.data['email']
        password = request.data['password']
        user = authenticate(email=email,password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response({"token":token}, status=status.HTTP_200_OK)
        return Response({"message": "Register sueccssfully"}, status= status.HTTP_201_CREATED)
    

class UserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserLoginView(APIView):
    # renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        # print(request)
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = request.data['email']
            password = request.data['password']
            user = authenticate(email=email,password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({"token":token}, status=status.HTTP_200_OK)
            return Response({'messages':['Email & password is Casesensitive Try Again']}, status= status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ChangeUserPasswordView(APIView):
    # renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    # @csrf_exempt
    def post(self,request,format=None):
        print(request.user)
        serializer = ChangeUserPasswordSerializer(data=request.data, context={"user":request.user})
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Password change sueccssfully"}, status= status.HTTP_200_OK)
    
class ViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()  # Fetch all booking records
    serializer_class = DestinationSerializer

class DestinationListCreateView(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Destination.objects.all()
        serializer = DestinationSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DestinationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class DestinationRetrieveUpdateDeleteView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Destination.objects.get(pk=pk)
        except Destination.DoesNotExist:
            raise Response('Destination Not Exist', status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = DestinationSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = DestinationSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class DestinationLIstView(APIView):
    def get(self, request, format=None):
        destinatins = Destination.objects.all()
        serializer = DestinationListSerializer(destinatins, many=True)
        return Response(serializer.data)

class DestinationDetailView(APIView):
    def get_object(self, pk):
        try:
            return Destination.objects.get(pk=pk)
        except Destination.DoesNotExist:
            raise Response('Destination Not Exist', status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk, format=None):
        destinatin = Destination.objects.get(pk=pk)
        serializer = DestinationDeatilSerializer(destinatin)
        return Response(serializer.data)


# views.py


class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DDestinationSerializer 
    # filter_backends = [DjangoFilterBackend,OrderingFilter]
    # filterset_fields = '__all__'
    # ordering_fields = '__all__'
    permission_classes = [IsAuthenticatedOrReadOnly]  # Read-only for unauthenticated users
    def create(self, request, *args, **kwargs):
        # Print the request data for debugging purposes
        print("Request Data:", request.data)

        # Create serializer with request data but do not save to database yet
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Set the user to the current logged-in user
        serializer.save(owner=request.user)

        # Return the serialized data and headers
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    

class DestinationImageViewSet(viewsets.ModelViewSet):
    queryset = DestinationImage.objects.all()
    serializer_class = DDestinationImageSerializer
    # filter_backends = [DjangoFilterBackend,OrderingFilter]
    # filterset_fields = '__all__'
    # ordering_fields = '__all__'
    permission_classes = [IsAuthenticatedOrReadOnly]

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BBookingSerializer
    # filter_backends = [DjangoFilterBackend,OrderingFilter]
    # filterset_fields = '__all__'
    # ordering_fields = '__all__'
    permission_classes = [IsAuthenticatedOrReadOnly]


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MMessageSerializer
    # filter_backends = [DjangoFilterBackend,OrderingFilter]
    # filterset_fields = '__all__'
    # ordering_fields = '__all__'
    permission_classes = [IsAuthenticatedOrReadOnly]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = RReviewSerializer
    # filter_backends = [DjangoFilterBackend,OrderingFilter]
    # filterset_fields = '__all__'
    # ordering_fields = '__all__'
    permission_classes = [IsAuthenticatedOrReadOnly]


class StarRatingViewSet(viewsets.ModelViewSet):
    queryset = StarRating.objects.all()
    serializer_class = SStarRatingSerializer
    # filter_backends = [DjangoFilterBackend,OrderingFilter]
    # filterset_fields = '__all__'
    # ordering_fields = '__all__'
    permission_classes = [IsAuthenticatedOrReadOnly]



class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RRoomSerializer
    # filter_backends = [DjangoFilterBackend,OrderingFilter]
    # filterset_fields = '__all__'
    # ordering_fields = '__all__'
    permission_classes = [IsAuthenticatedOrReadOnly]


class MessageAttachmentViewSet(viewsets.ModelViewSet):
    queryset = MessageAttachment.objects.all()
    serializer_class = MMessageAttachmentSerializer
    # filter_backends = [DjangoFilterBackend,OrderingFilter]
    # filterset_fields = '__all__'
    # ordering_fields = '__all__'
    permission_classes = [IsAuthenticatedOrReadOnly]

    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # filter_backends = [DjangoFilterBackend,OrderingFilter]
    # filterset_fields = ['name']
    # ordering_fields = ['name']
    permission_classes = [IsAuthenticatedOrReadOnly]
    
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = CContactSerializer
    filter_backends = [DjangoFilterBackend,OrderingFilter]
    filterset_fields = '__all__'
    ordering_fields = '__all__'
    permission_classes = [IsAdminOrReadPostOnly]
    def create(self, request, *args, **kwargs):
        # Print the request data
        print("Request Data:", request.data)
        
        # Perform the normal creation process
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PPostSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['id', 'title', 'content', 'user', 'created_at']
    ordering_fields = ['id', 'title', 'content', 'user', 'created_at']
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        # Print the request data for debugging purposes
        print("Request Data:", request.data)

        # Create serializer with request data but do not save to database yet
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Set the user to the current logged-in user
        serializer.save(user=request.user)

        # Return the serialized data and headers
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
