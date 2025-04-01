from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from api.models import User, Destination, DestinationImage, Booking, Message, MessageAttachment, Review, Room, StarRating, Contact, Post, Facility# Register your models here.

admin.site.site_header = "Innovative Event Planner"
# admin.site.site_title = "Innovative Event Planner admin Panel"
# admin.site.


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances

    readonly_fields = ("id", "joining_date") 
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["id", "email", "name", "username", "phone_number", "address", "joining_date", "date_of_birth", "profile_photo", "is_admin", "is_active", "profile_photo"]
    list_filter = ["is_admin"]
    fieldsets = [
        (None, {"fields": ["id", "email","username", "password"]}),
        ("Personal info", {"fields": ["name", "phone_number", "address", "date_of_birth", "joining_date", "profile_photo"]}),
        ("Permissions", {"fields": ["is_admin", "is_active"]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name", "date_of_birth", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email", "username"]
    ordering = ["email", "id"]
    filter_horizontal = []


# Now register the new UserAdmin...
admin.site.register(User, UserAdmin)
# ... and, since we're not using Django's built-in permissions,
# unregister the Group model from admin.
admin.site.unregister(Group)

# Register the Destination model
@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    # view_on_site = False
    list_display = ('id', 'name', 'owner', 'price', 'capacity')
    search_fields = ('name', 'id', 'address')
    # ordering = ('name',)

# Register the DestinationImage model
@admin.register(DestinationImage)
class DestinationImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'destination', 'added_by', 'date_time')
    search_fields = ('destination__name', 'added_by__username')
    list_filter = ('date_time',)
    ordering = ('-date_time',)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user', 'destination', 'check_in_date', 'check_out_date', 'date_time', 'phone_number', 'address')  # List all fields
    search_fields = ('name', 'user__username', 'phone_number')  # Enable search by name, user, and phone number
    list_filter = ('destination', 'check_in_date', 'check_out_date')  # Add filters for destination and dates


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'destination', 'user', 'message', 'date_time', 'is_read', 'reply_on')  # List all fields here
    
@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ['id','name']  # List all fields here


@admin.register(MessageAttachment)
class MessageAttachmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'attachment', 'message', 'date_time')  # List all fields here


@admin.register(StarRating)
class StarRatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'star', 'user', 'destination', 'date_time', 'comment')  # List all fields

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id','user', 'destination', 'date_time', 'comment', 'reply_on')

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'number_of_room', 'room_type', 'destination')  # List all fields
    
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'subject','message','created_at')
    readonly_fields = ("id", "created_at")


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'content', 'user', 'image','created_at')
    readonly_fields = ("id", "created_at")
