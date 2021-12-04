package be.witspirit.playground.backend;

import lombok.Data;
import lombok.NonNull;

@Data
public class SvgDescriptor {
    @NonNull
    private final String id;
    @NonNull
    private final String name;
    private final String description;
}
