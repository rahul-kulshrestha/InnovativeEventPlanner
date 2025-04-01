from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from api.managers import UserManager
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import date
# Create your models here.

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    username = models.CharField(max_length=50, unique=True, blank=True)  # Username
    name = models.CharField(max_length=255, null=False)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    date_of_birth = models.DateField()
    address = models.CharField(max_length=255, null=True, blank=True)  # User Address
    profile_photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True)
    joining_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["date_of_birth","name",]

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    def clean(self):
        # Ensure date_of_birth is not in the future
        dob = self.date_of_birth
        if dob > timezone.now().date():
            raise ValidationError('Date of birth cannot be in the future.')
        today = date.today()
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        if age < 18:
            raise ValidationError('User must be at least 18 years old.')
        
    def save(self, *args, **kwargs):
        # Call the parent class's save method to generate the id first
        super().save(*args, **kwargs)
        
        # Set slug based on the id after the object is saved
        if not self.username:
            self.username = f'mymodel-{self.id}'
            # Save again to update the slug
            super().save(*args, **kwargs)
    


class Facility(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Destination(models.Model):
    name = models.CharField(max_length=255, null=False)  # Destination Name
    phone_number = models.CharField(max_length=15, null=True, blank=True)  # Phone Number
    owner = models.ForeignKey('User', on_delete=models.CASCADE)  # User Foreign Key
    address = models.CharField(max_length=255, null=False)
    city = models.CharField(max_length=100)
    image = models.ImageField(upload_to='destination/', null=True, blank=True)  # Address
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)  # Maximum Price
    # min_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)  # Minimum Price
    facilities = models.ManyToManyField(Facility, related_name='destination')
    
    capacity = models.IntegerField(null=False)  # Maximum Capacity
    # min_capacity = models.IntegerField(null=False)  # Minimum Capacity
    # room_availability = models.BooleanField(default=False)  # Room Availability
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)# Description

    def __str__(self):
        return self.name



# class Facility(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name

# class Destination(models.Model):
#     name = models.CharField(max_length=255)
#     address = models.CharField(max_length=500)
#     city = models.CharField(max_length=100)
#     capacity = models.IntegerField()
#     price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
#     facilities = models.ManyToManyField(Facility, related_name='destination')
#     availability = models.BooleanField(default=True)
#     contact_email = models.EmailField()
#     contact_phone = models.CharField(max_length=20)
#     image = models.ImageField(upload_to='destination_images/', blank=True, null=True)

#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.name} - {self.city}"


    
class DestinationImage(models.Model):
    id = models.AutoField(primary_key=True)  # Image ID
    image = models.ImageField(upload_to='destination_images/', null=False)  # Image File
    destination = models.ForeignKey('Destination', on_delete=models.CASCADE)  # Foreign Key to Destination
    added_by = models.ForeignKey('User', on_delete=models.CASCADE)  # Foreign Key to User
    date_time = models.DateTimeField(auto_now_add=True)  # Date and Time

    def __str__(self):
        return f"Image {self.id} for {self.destination.name}"
    


class Booking(models.Model):
    id = models.AutoField(primary_key=True)  # Primary Key
    name = models.CharField(max_length=255)  # Not Null
    user = models.ForeignKey('User', on_delete=models.CASCADE)  # Foreign Key to User model
    destination = models.ForeignKey('Destination', on_delete=models.CASCADE)  # Foreign Key to Destination model
    check_in_date = models.DateField()  # Not Null
    check_out_date = models.DateField()  # Not Null
    date_time = models.DateTimeField(auto_now_add=True)  # Not Null
    phone_number = models.CharField(max_length=20)  # Not Null
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Maximum Price 
    address = models.CharField(max_length=255, null=True, blank=True)  # Optional

    def __str__(self):
        return f'{self.name} - {self.destination}'
    
    def clean(self):
        # Validate that from_date is not greater than to_date
        if self.check_in_date > self.check_out_date:
            raise ValidationError(('Check out date cannot be greater than check in date.'))
        
    


class Message(models.Model):
    id = models.AutoField(primary_key=True)  # Primary Key
    destination = models.ForeignKey('Destination', on_delete=models.CASCADE)  # Foreign Key to Destination model
    user = models.ForeignKey('User', on_delete=models.CASCADE)  # Foreign Key to User model
    message = models.CharField(max_length=500)  # Not Null
    date_time = models.DateTimeField(auto_now_add=True)  # Not Null
    is_read = models.BooleanField(default=False)  # Not Null
    reply_on = models.ForeignKey('self', null=True, blank=True,related_name='replies', on_delete=models.SET_NULL)  # Optional (Reply to another message)
      # Optional, reply to another message

    def __str__(self):
        return f'Message from {self.user} to {self.destination}'





class Review(models.Model):
    id = models.AutoField(primary_key=True)  # Primary Key
    destination = models.ForeignKey('Destination', on_delete=models.CASCADE)  # Foreign Key to Destination model
    user = models.ForeignKey('User', on_delete=models.CASCADE)  # Foreign Key to User model
    date_time = models.DateTimeField(auto_now_add=True)  # Not Null, auto set date and time when created
    comment = models.CharField(max_length=500)  # Feedback comment, Not Null
    reply_on = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL)  # Optional, reference to self

    def __str__(self):
        return f'Feedback by {self.user} on {self.destination}'


class StarRating(models.Model):
    id = models.AutoField(primary_key=True)  # Primary Key
    star = models.IntegerField(validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ])  # Stars, Not Null
    user = models.ForeignKey('User', on_delete=models.CASCADE)  # Foreign Key to User model
    destination = models.ForeignKey('Destination', on_delete=models.CASCADE)  # Foreign Key to Destination model
    date_time = models.DateTimeField(auto_now_add=True)  # Not Null
    comment = models.CharField(max_length=500, null=True, blank=True)  # Optional comment

    def __str__(self):
        return f'{self.star} Stars by {self.user} for {self.destination}'

class Room(models.Model):
    id = models.AutoField(primary_key=True)  # Primary Key
    number_of_room = models.IntegerField()  # Not Null
    room_type = models.CharField(max_length=255)  # Room Type, Not Null
    destination = models.ForeignKey('Destination', on_delete=models.CASCADE)  # Foreign Key to Destination model

    def __str__(self):
        return f'{self.number_of_room} - {self.room_type} at {self.destination}'


class MessageAttachment(models.Model):
    id = models.AutoField(primary_key=True)  # Primary Key
    attachment = models.FileField(upload_to='attachments/')  # Not Null
    message = models.ForeignKey('Message', on_delete=models.CASCADE)  # Foreign Key to Message model
    date_time = models.DateTimeField(auto_now_add=True)  # Not Null

    def __str__(self):
        return f'Attachment for {self.message}'


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"
    
    
class Post(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title