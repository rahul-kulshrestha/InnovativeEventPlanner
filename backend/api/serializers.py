from rest_framework import serializers
from api.models import User, Destination, Room, StarRating, DestinationImage, Booking, Message, Review, StarRating, MessageAttachment, Contact, Post
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator

class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        write_only=True,
        # required=True,
        style={'input_type': 'password'}
    )
    class Meta:
        model = User
        fields = ['email','name', 'date_of_birth', 'password', 'password2']
        extra_kwargs = {
            'password':{"write_only":True}
        }
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return super().validate(attrs)
    
    def create(self, validated_data):
    
        return User.objects.create_user(**validated_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=225)
    class Meta:
        model = User
        fields = ["email","password"]
        extra_kwargs = {
            'password':{"write_only":True}
        }

class ChangeUserPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        write_only=True,
        # required=True,
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        # required=True,
        style={'input_type': 'password'}
    )
    class Meta:
        # model = User
        fields = ['password', 'password2']

    def validate(self, attrs):
        user = self.context.get('user')
        print(user)
        print(attrs['password'])
        print(attrs['password2'])
        
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        user.set_password(attrs['password'])
        user.save()
        return attrs
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        exclude = ['password']

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
    
class DestinationSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    room_availability = {}
    class Meta:
        model = Destination  # Reference the Destination model
        fields = ['id','owner','room_availability'] # Include all fields in the serialized output
        

    def validate(self, attrs):
        print('no')
        if attrs['room_availability']:
            print('yse')
            self.room_availability = Room.objects.all()
        return attrs
    
class StarRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StarRating
        fields =['id','star','date_time','comment']


class DestinationListSerializer(serializers.ModelSerializer):
    rating = serializers.FloatField(default=1.0)
    image = serializers.ImageField(required=False)
    class Meta:
        model = Destination
        fields = ['id', 'name', 'description', 'address', 'rating','image']

    def to_representation(self, instance):
        # Call the default `to_representation` method
        representation = super().to_representation(instance)
        destination = Destination.objects.get(pk=representation['id'])
        # print(destination)
        img = DestinationImage.objects.filter(destination=destination).first()
        # print(img.image)
        image = None
        if img:
            image = "/" +str(img.image)
        representation['image'] =  image
        r = StarRating.objects.values_list('star')
        r1 = 0
        l = len(r)
        for i in list((r)):
            r1 += sum(i)
        
        # Re-assign rating value (example: setting it to 5)
        representation['rating'] = float('%.1f' % (r1/l))  # Or some other logic    
        print()
        return representation
   

class DeatinatinImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationImage
        fields =['id','image','date_time','added_by']
    
class DestinationDeatilSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Destination
        fields = ['id', 'name', 'owner', 'max_price', 'min_price', 'max_capacity', 'min_capacity', 'room_availability','address','rating', 'image']

    def get_rating(self, obj):
        # Assuming there's a related name or reverse relationship to access StarRating instances
        star_ratings = obj.starrating_set.all()  # Adjust if you have a related name in your ForeignKey/ManyToManyField
        return StarRatingSerializer(star_ratings, many=True).data
    
    def get_image(self, obj):
        # Assuming there's a related name or reverse relationship to access StarRating instances
        destination_image = obj.destinationimage_set.all()  # Adjust if you have a related name in your ForeignKey/ManyToManyField
        return DeatinatinImageSerializer(destination_image, many=True).data
    




# admin api
# serializers.py
# from rest_framework import serializers
# from .models import Destination, DestinationImage

class DDestinationSerializer(serializers.ModelSerializer):
    # owner = UserSerializer()
    class Meta:
        model = Destination
        fields = '__all__'  # or list the specific fields you want to expose

    
 

class DDestinationImageSerializer(serializers.ModelSerializer):
    # date_time = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = DestinationImage
        fields = '__all__'  # or list the specific fields you want to expose


class BBookingSerializer(serializers.ModelSerializer):
    # date_time = serializers.DateTimeField(read_only=True)
    destination = DDestinationSerializer()
    class Meta:
        model = Booking
        fields = '__all__'
          # or list the specific fields you want to expose


class MMessageSerializer(serializers.ModelSerializer):
    # date_time = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Message
        fields = '__all__'  # or list the specific fields you want to expose


class RReviewSerializer(serializers.ModelSerializer):
    # date_time = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Review
        fields = '__all__'  # or list the specific fields you want to expose


class SStarRatingSerializer(serializers.ModelSerializer):
    # date_time = serializers.DateTimeField(read_only=True)
    class Meta:
        model = StarRating
        fields = '__all__'  # or list the specific fields you want to expose  


class RRoomSerializer(serializers.ModelSerializer):
    # date_time = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Room
        fields = '__all__'  # or list the specific fields you want to expose


class MMessageAttachmentSerializer(serializers.ModelSerializer):
    # date_time = serializers.DateTimeField(read_only=True)
    class Meta:
        model = MessageAttachment
        fields = '__all__'  # or list the specific fields you want to expose
        
class CContactSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Contact
        fields = '__all__' 
        
class PPostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Post
        fields = '__all__' 