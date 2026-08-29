import sys
import Quartz
import Vision
from CoreFoundation import NSURL

def recognize_text(image_path):
    url = NSURL.fileURLWithPath_(image_path)
    request = Vision.VNRecognizeTextRequest.alloc().init()
    handler = Vision.VNImageRequestHandler.alloc().initWithURL_options_(url, None)
    handler.performRequests_error_([request], None)
    for result in request.results():
        print(result.text())

recognize_text(sys.argv[1])
