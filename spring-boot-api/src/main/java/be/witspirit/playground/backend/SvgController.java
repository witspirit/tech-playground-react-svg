package be.witspirit.playground.backend;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/svgs")
public class SvgController {

    private final Map<String, SvgDescriptor> svgs = new HashMap<>();

    @GetMapping
    public List<SvgDescriptor> list() {
        return List.copyOf(svgs.values());
    }

    @PostMapping
    public void add(@RequestBody SvgUploadRequest svgUploadRequest) {
        SvgDescriptor svgDescriptor = new SvgDescriptor(UUID.randomUUID().toString(), svgUploadRequest.getName(), svgUploadRequest.getDescription());
        svgs.put(svgDescriptor.getId(), svgDescriptor);
    }

    @GetMapping("/{id}")
    public SvgDescriptor get(@PathVariable String id) {
        return svgs.get(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        svgs.remove(id);
    }


}
