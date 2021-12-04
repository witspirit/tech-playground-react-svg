package be.witspirit.playground.backend;

import lombok.Data;
import lombok.NonNull;

@Data
public class SvgUploadRequest {
    @NonNull
    private final String name;
    private final String description;
}
