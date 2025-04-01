from rest_framework import renderers
import json
class UserRenderer(renderers.JSONRenderer):
    charset='utf-8'
    def render(self, data, accepted_media_type=None, renderer_context=None):
        respones = ''
        if 'ErrorDetail' in str(data) or 'non_field_error' in str(data):
            respones = json.dumps({'error':data})
            print(respones)
        else:
            
            respones = json.dumps(data)
        # return super().render(data, accepted_media_type, renderer_context)
        return respones